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
      location: { state: siteId },
      push
    },
  } = props;

  const [site, setSite] = useState(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { addNewSite, removeSite, editSite, getSitesById, loading, error } = useFirebaseDB();

  useEffect(() => {
    let mounted: boolean = true;
    if(siteId && !error && mounted) {
      getSitesById(siteId).then((site) => setSite(site));
    }
    return() => {
      mounted = false;
    }
    // eslint-disable-next-line
  }, [error, siteId])

  const required = Yup.string().required(validationTexts.required);

  const schema = Yup.object().shape({
    siteName: required,
    userName: required,
    password: required,
  });

  const initialValues = {
    siteName: site?.siteName,
    userName: site?.userName,
    password: site?.password,
    siteUrl: site?.url
  };

  const handleAddSite = async ({siteName, userName, password, siteUrl}: Record<any, string>, form: any) => {
    if(site) {
      await editSite(site.id, false, siteName, userName, password, siteUrl);
    } else {
      await addNewSite(siteName, userName, password, siteUrl);
    }
    push('/passwords');
    setTimeout(() => form.restart(), 1000);
  }

  const handleremoveSite = async () => {
    await removeSite(site.id);
    push('/passwords');
  }

  let JSXElement: JSX.Element | null = null;
  if(loading) {
    JSXElement = <CircularProgress />;
  } else if (error) {
    JSXElement = <div>{error}</div>;
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
                marginBottom={30}
                showError
                type="text"
                name="siteName"
                label="Site"
              />
              <TextField
                marginBottom={30}
                showError
                type="text"
                name="userName"
                label="User Name"
                showExtraButton={!!site}
                extraFeatureAction={() => copyText(site['userName'])}
                extraFeaureName="Copy"
              />
              <TextField
                marginBottom={30}
                showError
                type={showPassword ? 'text' : 'password'}
                name="password"
                label="Site password"
                showExtraButton={!!site}
                icon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    show passowrd
                  </button>
                }
                extraFeatureAction={() => copyText(site['password'])}
                extraFeaureName="Copy"
              />
              <TextField
                marginBottom={30}
                showError
                type="text"
                showExtraButton={site?.url}
                name="siteUrl"
                extraFeatureAction={() => window.open(site['url'])}
                extraFeaureName="Go"
                label="Site Url"
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
    );
  };

  return JSXElement;
}

export default withRouter(ManageSite);