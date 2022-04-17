export function instancesForList(insancesArray: any[], instancesList: any[]) {
  insancesArray.forEach((instance: any) => {
    console.log(instance);
    
      instancesList.push(
        {
          key: 'Name: ',
          id: 'moduleName',
          value: instance.instance_name,
        },
        {
          key: 'ID: ',
          id: 'moduleId',
          value: instance.widget_instance_id,
        },
        {
          key: 'Login: ',
          id: 'loginURL',
          value:
            instance.static_content.storeLoginUrl ||
            instance.static_content.storeAccountLoginUrl || 'N/A',
        },
        {
          key: 'Registration: ',
          id: 'registerURL',
          value:
            instance.static_content.storeRegistrationUrl ||
            instance.static_content.storeAccountRegistrationUrl || 'N/A',
        }
      )
  })
}
