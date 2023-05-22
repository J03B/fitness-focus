import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

export default function BreadcrumbNav(props) {
  let allLinks = props.breadcrumbs;
  let currentPage = allLinks[allLinks.length-1];
  let otherPages = allLinks.slice(0, allLinks.length-1)

  return (
    <div role='presentation' >
      <Breadcrumbs separator='›' aria-label='breadcrumb' sx={{
        my: 2,
        '& ol': {
          justifyContent: 'center',
          margin: 'auto'
        } 
      }}
      >
        <Link underline='hover' color='inherit' href='/'>
          Home
        </Link>

        {otherPages && otherPages.map((link) => (
          <Link underline='hover' color='inherit' href={link.href}>
            {link.name}
          </Link>
          )
        )}
    
        <Typography color='text.primary'>{currentPage.name}</Typography>
      </Breadcrumbs>
    </div>
  );
}