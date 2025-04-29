document.addEventListener('DOMContentLoaded', function() {
  // Wait a short time to ensure the MkDocs navigation is fully rendered
  setTimeout(generateDynamicNavigation, 500);
});

function generateDynamicNavigation() {
  console.log('Generating dynamic navigation');
  
  // Create our custom navigation container
  const customNavContainer = document.createElement('div');
  customNavContainer.className = 'custom-nav-container';
  
  const customNav = document.createElement('nav');
  customNav.className = 'custom-nav';
  
  const customNavList = document.createElement('ul');
  customNavList.className = 'custom-nav-list';
  
  // Add Portal Home link as the first item
  const portalHomeItem = document.createElement('li');
  portalHomeItem.className = 'custom-nav-item';
  
  const portalHomeLink = document.createElement('a');
  portalHomeLink.className = 'custom-nav-link';
  portalHomeLink.href = '/'; // Link to main portal root
  portalHomeLink.textContent = 'Portal Home';
  
  portalHomeItem.appendChild(portalHomeLink);
  customNavList.appendChild(portalHomeItem);
  
  // Parse the navigation directly from the mkdocs.yml structure
  // This is more reliable than trying to extract it from the DOM
  const navItems = [];
  
  // Get the navigation items from the sidebar
  const sidebarItems = document.querySelectorAll('.md-nav--primary > .md-nav__list > .md-nav__item');
  
  sidebarItems.forEach(function(item) {
    // Skip the first item (Home) as we already added Portal Home
    if (item.classList.contains('md-nav__item--active') && 
        item.querySelector('.md-nav__link').textContent.trim() === 'Home') {
      return;
    }
    
    // Get the section title and link
    const titleElement = item.querySelector('.md-nav__link');
    if (!titleElement) return;
    
    const title = titleElement.textContent.trim();
    const href = titleElement.getAttribute('href') || '#';
    
    // Check if this item has children (dropdown)
    const hasChildren = item.querySelector('.md-nav__item');
    
    // Create the nav item
    const navItem = {
      title: title,
      href: href,
      children: []
    };
    
    // If it has children, get them
    if (hasChildren) {
      const childItems = item.querySelectorAll(':scope > .md-nav > .md-nav__list > .md-nav__item > .md-nav__link');
      
      childItems.forEach(function(childItem) {
        const childTitle = childItem.textContent.trim();
        const childHref = childItem.getAttribute('href') || '#';
        
        navItem.children.push({
          title: childTitle,
          href: childHref
        });
      });
    }
    
    navItems.push(navItem);
  });
  
  // Create the navigation items
  navItems.forEach(function(item) {
    const customNavItem = document.createElement('li');
    customNavItem.className = 'custom-nav-item';
    
    // Create the main link
    const customNavLink = document.createElement('a');
    customNavLink.className = 'custom-nav-link';
    customNavLink.href = item.href;
    customNavLink.textContent = item.title;
    
    // Add the link to the nav item
    customNavItem.appendChild(customNavLink);
    
    // If it has children, create a dropdown
    if (item.children && item.children.length > 0) {
      customNavItem.classList.add('dropdown');
      
      // Create the dropdown menu
      const dropdownMenu = document.createElement('ul');
      dropdownMenu.className = 'dropdown-menu';
      
      // Add the children
      item.children.forEach(function(child) {
        const dropdownListItem = document.createElement('li');
        
        const dropdownLinkElement = document.createElement('a');
        dropdownLinkElement.href = child.href;
        dropdownLinkElement.textContent = child.title;
        
        // Check if it's an external link
        if (child.href.startsWith('http')) {
          dropdownLinkElement.target = '_blank';
        }
        
        // Add the link to the list item
        dropdownListItem.appendChild(dropdownLinkElement);
        
        // Add the list item to the dropdown menu
        dropdownMenu.appendChild(dropdownListItem);
      });
      
      // Add the dropdown menu to the nav item
      customNavItem.appendChild(dropdownMenu);
    }
    
    // Add the nav item to the nav list
    customNavList.appendChild(customNavItem);
  });
  
  // Assemble the navigation
  customNav.appendChild(customNavList);
  customNavContainer.appendChild(customNav);
  
  // Insert the custom navigation after the header
  const header = document.querySelector('.md-header');
  if (header) {
    header.parentNode.insertBefore(customNavContainer, header.nextSibling);
  }
  
  // Hide the original tabs
  const originalTabs = document.querySelector('.md-tabs');
  if (originalTabs) {
    originalTabs.style.display = 'none';
  }
}
