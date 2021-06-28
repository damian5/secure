import React, { useState, memo, useCallback } from 'react';
import { useSearchAndSort } from 'hooks/useSearchAndSort';
import { useHistory, Link } from 'react-router-dom';
import { Site } from 'interfaces/dataAPI';
import { SORT_OPTIONS } from 'constant/sortOptions'
import { Wrapper, SitesWrapper, StyledSite } from './styles';
import { useFirebaseDB } from 'hooks/useFirebaseDB';
import SearchBar from 'components/shared/SearchBar';
import SelectCard from 'components/shared/SelectCard';
import Divider from 'components/shared/Divider';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import { colorsPalette } from 'constant/colors';
import SortIcon from '@material-ui/icons/Sort';

interface PasswordState {
  isVisible: boolean,
  index: number
}

interface RenderSitesProps {
  sites: Site[];
  isFavorite?: boolean;
}

const RenderSites = ({sites, isFavorite}: RenderSitesProps) => {
  const [ searchParam, setSearchParam ] = useState<string>(null);
  const [ sortParam, setSortParam ] = useState<string>(SORT_OPTIONS[3]);
  const [ showSort, setShowSort ] = useState<boolean>(false);
  const { editSite } = useFirebaseDB();
  const [ showPassword, setShowPassword ] = useState<PasswordState>({
    isVisible: false,
    index: null,
  });
  const { searchAndSort } = useSearchAndSort();
  const history = useHistory();

  const handleSiteClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, siteId: string) => {
    e.stopPropagation();
    e.preventDefault();
    history.push('/manage-site', siteId);
  }

  const handleShowPassword = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number) => {
    e.stopPropagation();
    setShowPassword(prevState => {
      if(~showPassword.index && prevState.index !== index && showPassword.isVisible) {
        return {
          ...prevState,
          index: index
        }
      } else {
        return {
          isVisible: !prevState.isVisible,
          index: index
        }
      }
    });
  }, [showPassword]);

  const renderPassword = useCallback((index: number, password: string) => (
    (showPassword.index === index && showPassword.isVisible) ?
      password :
      Array(password.length + 1).join(" * ")
  ), [showPassword]);

  const handleFavorite = useCallback((e: any, id: string) => {
    e.stopPropagation();
    e.preventDefault();
    editSite(id, true)
  }, [editSite]);

  let JSXElement = null;

  const favoriteButtonStyle = {
    fill: `${colorsPalette.darkRed}`
  }


  const renderSite = ({ siteName, userName, id, password, createdAt, modifiedAt, url, favorite }, index) => (
    <StyledSite
      onClick={(e) => handleSiteClick(e, id)}
      key={index}
    >
      <h1>{siteName}</h1>
      <Divider topSpace={1} bottomSpace={1} height={0.3}/>
      <p>{userName}</p>
      <div>
        <p>{renderPassword(index, password)}</p>
        <button type="button" onClick={(e) => {handleShowPassword(e, index)}}>
          Show Password
        </button>
      </div>
      {url && <Divider topSpace={10} bottomSpace={1} height={0.3} />}
      <p>{url}</p>
      <Divider topSpace={1} bottomSpace={1} height={0.3}/>
      <p>Modified at {modifiedAt}</p>
      <p>Created at {createdAt}</p>
      <Divider topSpace={1} bottomSpace={1} height={0.3}/>
      <button className="favorite-button" type="button" onClick={(e) => handleFavorite(e, id)}>{favorite ? <FavoriteIcon style={favoriteButtonStyle}/> : <FavoriteBorder style={favoriteButtonStyle}/>}</button>
    </StyledSite>
  )

  if(sites?.length > 0) {
    const filteredSites = searchParam || sortParam ? searchAndSort(sites, searchParam, sortParam) : sites
    JSXElement = <>
      <SearchBar
        placeholder="Search your site"
        onChange={(value) => setSearchParam(value)}
      />
      <SortIcon onClick={() => setShowSort(true)}>Sort</SortIcon>
      <SitesWrapper>
        {
          filteredSites?.map((site: Site, index: number) => {
            const { siteName, userName, id, password, createdAt, modifiedAt, url, favorite } = site;
            return (
              renderSite({ siteName, userName, id, password, createdAt, modifiedAt, url, favorite }, index)
            )
          })
        }
      </SitesWrapper>

    {
      showSort &&
      <SelectCard
        setValue={setSortParam}
        selectedValue={sortParam}
        options={SORT_OPTIONS}
        onClose={() => setShowSort(false)}
      />
    }
    </>
  } else {
    JSXElement = isFavorite ? <div>You don't have favorites yet</div> : <div>Crate your first site here</div>
  }

  return (
    <Wrapper>
      {JSXElement}
      {!isFavorite && <Link to='/manage-site/'>Add new App</Link>}
    </Wrapper>
  )
}

export default memo(RenderSites);