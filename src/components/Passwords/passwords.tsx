import React, {useEffect, useState} from 'react';
import { useFirebaseDB } from 'hooks/useFirebaseDB';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom'
import { CircularProgress } from '@material-ui/core';
import ManagePassword from 'components/Passwords/ManagePassword';

const Passwords = (props: RouteComponentProps) => {

  const { addNewItem, getItems } = useFirebaseDB()
  const [data, setData] = useState(null);
  const [modalInfo, setModalInfo] = useState({isOpen: false, item: null})

  useEffect(() => {
    getItems().then(result => setData(result))
  }, [modalInfo.isOpen])

  const handleItemClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, app) => {
    e.stopPropagation()
    e.preventDefault()
    setModalInfo({
      isOpen: true,
      item: app,
    })
  }
  console.log(modalInfo);
  const renderItems = () => {
    if(data === null) {
      return <CircularProgress></CircularProgress>
    } else {
      if(data.sites.length > 0) {
        return data.sites.map((site, i) =>
          <div
            onClick={(e) => handleItemClick(e, site)}
            key={i}
            style={{border: '1px solid grey', cursor: 'pointer'}}
          >
            <h1>{site.siteName}</h1>
            <p>{site.userName}</p>
            <p>{site.password}</p>
          </div>
        ).reverse();
      }
    }

  }
  return(
    <>
      {renderItems()}
      <button onClick={() => setModalInfo(prevState => ({isOpen: true, item: prevState.item, isNew: true}))}>add new app</button>
      <ManagePassword
        isOpen={modalInfo.isOpen}
        item={modalInfo.item}
        onClose={() => setModalInfo({isOpen: false, item: null})}
        onChange={()=>{}}
      />
    </>
  )
}

export default withRouter(Passwords);