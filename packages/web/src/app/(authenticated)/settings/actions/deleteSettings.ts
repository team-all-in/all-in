'use server';

import deleteSettings from '~/server/settings/deleteSettings';

const deleteSettingsAction = async (_previousState: unknown, formData: FormData) => {
  const app: string = formData.get('app') as string;

  await deleteSettings(app);

  return '';
};

export default deleteSettingsAction;
