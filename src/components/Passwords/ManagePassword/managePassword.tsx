import React from 'react'
import { ManagePasswordWrapper } from './styles';
import { Form } from 'react-final-form'
import { Link } from 'react-router-dom'
import { useFirebaseDB } from 'hooks/useFirebaseDB';
import TextField from 'components/shared/TextField';
import { validateFormValues } from 'helpers/formValidation';
import * as Yup from 'yup';
import { validation as validationTexts } from 'constant/en.json';

const ManagePassword = ({
  item,
  onClose,
  onChange,
  isOpen,
}) => {
  console.log('ManagePassword', item);
  const { addNewItem, removeItem } = useFirebaseDB()
  const { required } = validationTexts;

  const handlePasswordSubmit = async ({siteName, userName, password}: Record<any, string>) => {
    try {
      addNewItem(siteName, userName, password);
      onClose()
    } catch (error) {
      console.log(error)
    }
  }

  const schema = Yup.object().shape({
    siteName: Yup.string().required(required),
    userName: Yup.string().required(required),
    password: Yup.string().required(required),
  })

  return (
    <ManagePasswordWrapper isOpen={isOpen}>
      <Form
        initialValues={{ siteName: item?.site, userName: item?.userName, password: item?.password }}
        onSubmit={(values) => handlePasswordSubmit(values)}
        validate={validateFormValues(schema)}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            {item ? <h2>Edit {item?.site}</h2> : <h2>Add a new site</h2>}
            <TextField
              type="text"
              name="siteName"
              label="Site"
            />
            <TextField
              type="text"
              name="userName"
              label="User Name"
            />
            <TextField
              type="password"
              name="password"
              label="Site password"
            />
            <button type="submit">Submit</button>
            <label>Already a member? {<Link to='/signin'>sign in!</Link>}</label>
          </form>
        )}
      />
      <button onClick={() => onClose()}>back</button>
      <button onClick={() => removeItem(item?.id)}>remove item</button>
    </ManagePasswordWrapper>
  )
}

export default ManagePassword
