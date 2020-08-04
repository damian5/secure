import React, { useState, memo, useCallback } from 'react';
import { useSearchAndSort } from 'hooks/useSearchAndSort';
import { useHistory, Link } from 'react-router-dom';
import { Site } from 'interfaces/dataAPI';
import { SORT_OPTIONS } from 'constant/sortOptions'
import { SitesWrapper } from './styles';
import { useFirebaseDB } from 'hooks/useFirebaseDB';
import SearchBar from 'components/shared/SearchBar';
import SelectCard from 'components/shared/SelectCard';
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

  if(sites?.length > 0) {
    const filteredSites = searchParam || sortParam ? searchAndSort(sites, searchParam, sortParam) : sites
    JSXElement = <>
      <SearchBar
        placeholder="Search your site"
        onChange={(value) => setSearchParam(value)}
      />
      <button onClick={() => setShowSort(true)}>Sort</button>
    {
      filteredSites?.map((site: Site, i: number) => {
        const { siteName, userName, id, password, createdAt, modifiedAt, url, favorite } = site;
        return (
          <div
            onClick={(e) => handleSiteClick(e, id)}
            key={i}
            style={{border: '1px solid grey', cursor: 'pointer'}}
          >
            <h1>{siteName}</h1>
            <p>{userName}</p>
            <div>
              <p>{renderPassword(i, password)}</p>
              <button type="button" onClick={(e) => {handleShowPassword(e, i)}}>
                Show Password
              </button>
            </div>
            <p>{url}</p>
            <p>Modified at {modifiedAt}</p>
            <p>Created at {createdAt}</p>
            <button type="button" onClick={(e) => handleFavorite(e, id)}>{favorite ? 'isFavorite' : 'is not Favorite'}</button>
          </div>
        )
      })
    }
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
    <SitesWrapper>
      {JSXElement}
      {!isFavorite && <Link to='/manage-site/'>Add new App</Link>}
    </SitesWrapper>
  )
}

export default memo(RenderSites);