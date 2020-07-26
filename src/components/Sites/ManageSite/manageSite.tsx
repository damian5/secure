import React, { useState, useEffect } from 'react';
import { ManageSiteWrapper } from './styles';
import { Form } from 'react-final-form';
import { useFirebaseDB } from 'hooks/useFirebaseDB';
import { validateFormValues } from 'helpers/formValidation';
import { validation as validationTexts } from 'constant/en.json';
import * as Yup from 'yup';
import TextField from 'components/shared/TextField';
import { withRouter } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import { copyText } from 'helpers/copyText';

const ManageSite = (props: any) => {
  const {
    history: {
      location: {
        state: siteId
      },
      push
    },
  } = props
  const [site, setSite] = useState(null)
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { addNewSite, removeSite, editSite, getSitesById, loading, error } = useFirebaseDB()

  useEffect(() => {
    let mounted: boolean = true
    if(siteId && !error && mounted) {
      getSitesById(siteId).then((site) => setSite(site))
    }
    return() => {
      mounted = false;
    }
    // eslint-disable-next-line
  }, [error, siteId])

  const { required } = validationTexts;

  const handleAddSite = async ({siteName, userName, password}: Record<any, string>, form: any) => {
    if(site) {
      await editSite(siteName, userName, password, site.id)
    } else {
      await addNewSite(siteName, userName, password);
    }
    push('/passwords');
    setTimeout(() => form.restart(), 1000)
  }

  const handleremoveSite = async () => {
    await removeSite(site.id)
    push('/passwords');
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

  let JSXElement: JSX.Element | null = null;
  if(loading) {
    JSXElement = <CircularProgress />
  } else if (error) {
    JSXElement = <div>{error}</div>
  } else {
    JSXElement = (
      <ManageSiteWrapper>
        <button className='back-button' onClick={() => push('/passwords')}>back</button>
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
                showCopy={!!site}
                copyFeature={() => site && copyText(site['userName'])}
              />
              <TextField
                showError
                type={showPassword ? 'text' : 'password'}
                name="password"
                label="Site password"
                showCopy={!!site}
                icon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    show passowrd
                  </button>
                }
                copyFeature={() => site && copyText(site['password'])}
              />
              <button
                disabled={loading || pristine || invalid || submitting}
                type="submit"
              >
                {site ? "Edit" : "Add"}
              </button>
              {
                site &&
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => handleremoveSite()}
                  >
                    remove site
                  </button>
              }
            </form>
          )}
        />
      </ManageSiteWrapper>
    )
  }

  return JSXElement;
}

export default withRouter(ManageSite);
