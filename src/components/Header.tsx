import { Fragment } from 'react/jsx-runtime';
import { Button } from 'primereact/button';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import { Toolbar } from 'primereact/toolbar';

import '../assets/styles/header.css';

interface NavItem {
  label: string;
  icon: string;
}

export function Header() {
  const navItems: NavItem[] = [
    {
      label: 'Home',
      icon: 'pi pi-home'
    },
    {
      label: 'Blog',
      icon: 'pi pi-align-left'
    },
    {
      label: 'About',
      icon: 'pi pi-question-circle'
    },
  ];

  const startContent = (
    <Fragment>
      {navItems.map(({ label, icon }) => (
        <Button key={label} label={label} icon={icon} text />
      ))}
    </Fragment>
  );

  const centerContent = (
    <div className="header-title-container">
      <h1 className="site-title">Let's Cook!</h1>
    </div>
  );

  const endContent = (
    <Fragment>
      <Button icon="pi pi-pinterest" text />
      <Button icon="pi pi-twitter" text />
      <Button icon="pi pi-instagram" text />
    </Fragment>
  );

  return (
    <div className="site-header">
        <Toolbar className="header-toolbar" start={startContent} center={centerContent} end={endContent} />
        <div className="header-picture">
          <img src="/media/header-2.webp" alt="Delicious food" width={940} height={333} />
        </div>
        <div className="header-search-container">
          <IconField iconPosition="left">
            <InputIcon className="pi pi-search"> </InputIcon>
            <InputText v-model="value1" placeholder="Search" />
          </IconField>
          <Button icon="pi pi-search" rounded severity='info' />
        </div>
    </div>
  )
}
