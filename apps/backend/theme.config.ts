type ThemeConfig = {
    site_name: string
    site_url: string
    site_link: string
    primary: string
    header_bg: string
    header_text: string
    footer_bg: string
    footer_text: string
    footer_menus: {
        name: string
        link: string
    }[]
}

const themeConfig: ThemeConfig = {
  site_name: 'Meta Ads',
      site_url: 'www.metaads.net',
      site_link: 'https://www.metaads.net',

      // mail template color setup
      // Note: This color will be used in mail template only.
      primary: '#068179',
      header_bg: '#068179',
      header_text: '#ffffff',
      footer_bg: '#13161C',
      footer_text: '#a8aca9',
    // footer menus
    // Note: You can add or remove the footer menu item as you want.
    // Note: You can also change the footer menu item name.
    // Note: You can also change the footer menu item link.
    footer_menus: [
        {
            name: 'About Us',
            link: 'https://www.metaads.net/about-us',
        },
        {
            name: 'Contact Us',
            link: 'https://www.metaads.net/contact-us',
        },
        {
            name: 'Find Job',
            link: 'https://www.metaads.net/find-job',
        },
    ],

  // Note: If you want to edit the full site color, you need to edit the `tailwind.config.js` file in the root directory of the project.
}

export default themeConfig