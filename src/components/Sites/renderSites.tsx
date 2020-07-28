import React, { useState, memo } from 'react';
import { useSearchAndSort } from 'hooks/useSearchAndSort';
import { CircularProgress } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { Site } from 'interfaces/dataAPI';
import SearchBar from 'components/shared/SearchBar';
import SelectCard from 'components/shared/SelectCard';
import { SORT_OPTIONS } from 'constant/sortOptions'
interface PasswordState {
  isVisible: boolean,
  index: number
}

const RenderSites = (props: any) => {
  const [ searchParam, setSearchParam ] = useState<string>(null);
  const [ sortParam, setSortParam ] = useState<string>('a-z');
  const [ showSort, setShowSort ] = useState<boolean>(false);
  const [ showPassword, setShowPassword ] = useState<PasswordState>({
    isVisible: false,
    index: null,
  });
  const { searchAndSort } = useSearchAndSort();
  const { sites, loading } = props;

  const handleSiteClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, siteId: string) => {
    e.stopPropagation();
    e.preventDefault();
    props.history.push('/manage-site', siteId);
  }

  const handleShowPassword = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number) => {
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
  };

  const renderPassword = (index: number, password: string) => (
    (showPassword.index === index && showPassword.isVisible) ?
      password :
      Array(password.length).join(" * ")
  );

  let JSXElement = null;
  if(loading) {
    JSXElement = <CircularProgress />;
  } else {
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
          const { siteName, userName, id, password, createdAt, modifiedAt, url } = site;
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
      JSXElement = <div>Crate your first site here</div>;
    }
  }
  return JSXElement;
}

export default memo(withRouter(RenderSites));