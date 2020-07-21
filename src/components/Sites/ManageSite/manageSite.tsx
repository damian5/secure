import React from 'react';
import { ManageSiteWrapper } from './styles';
import { Form } from 'react-final-form';
import { useFirebaseDB } from 'hooks/useFirebaseDB';
import { validateFormValues } from 'helpers/formValidation';
import { validation as validationTexts } from 'constant/en.json';
import * as Yup from 'yup';
import TextField from 'components/shared/TextField';
import { Site } from 'interfaces/dataAPI';

interface ManageSiteProps {
  site: Site;
  isOpen: boolean;
  onClose: () => void;
  onChange: () => void;
  fetchData: () => void;
}

const ManageSite = ({
  site,
  isOpen,
  onClose,
  onChange,
  fetchData
}: ManageSiteProps) => {

  const { addNewSite, removeSite, loading } = useFirebaseDB()
  const { required } = validationTexts;

  const handleAddSite = async ({siteName, userName, password}: Record<any, string>, form: any) => {
    await addNewSite(siteName, userName, password);
    fetchData()
    onClose()
    setTimeout(() => form.restart(), 1000)
  }

  const handleremoveSite = async () => {
    await removeSite(site.id)
    fetchData();
    onClose();
  }

  const schema = Yup.object().shape({
    siteName: Yup.string().required(required),
    userName: Yup.string().required(required),
    password: Yup.string().required(required),
  })

  const initialValues = {
    siteName: site?.siteName,
    userName: site?.userName,
    password: site?.password
  }

  return (
    <ManageSiteWrapper isOpen={isOpen}>
      <button onClick={() => onClose()}>back</button>
      <Form
        initialValues={initialValues}
        onSubmit={(values, form) => handleAddSite(values, form)}
        validate={validateFormValues(schema)}
        render={({ handleSubmit, pristine, invalid, submitting }) => (
          <form onSubmit={(form) => handleSubmit(form)}>
            {site ? <h2>Edit {site?.siteName}</h2> : <h2>Add a new site</h2>}
            <TextField
              showError
              type="text"
              name="siteName"
              label="Site"
            />
            <TextField
              showError
              type="text"
              name="userName"
              label="User Name"
            />
            <TextField
              showError
              type="password"
              name="password"
              label="Site password"
            />
            <button
              disabled={loading || pristine || invalid || submitting}
              type="submit"
            >
              {site ? "Edit" : "Add"}
            </button>
          </form>
        )}
      />
      {
        site &&
          <button
            disabled={loading}
            onClick={() => handleremoveSite()}
          >
            remove site
          </button>
      }
    </ManageSiteWrapper>
  )
}

export default ManageSite;
