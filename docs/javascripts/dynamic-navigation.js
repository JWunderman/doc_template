document.addEventListener('DOMContentLoaded', function() {
  // Wait a short time to ensure the MkDocs navigation is fully rendered
  setTimeout(generateDynamicNavigation, 500);
});

function generateDynamicNavigation() {
  console.log('Generating dynamic navigation');
  
  // Remove any existing custom navigation to prevent duplication
  const existingNav = document.querySelector('.custom-nav-container');
  if (existingNav) {
    existingNav.remove();
  }
  
  // Create our custom navigation container
  const customNavContainer = document.createElement('div');
  customNavContainer.className = 'custom-nav-container';
  
  const customNav = document.createElement('nav');
  customNav.className = 'custom-nav';
  
  const customNavList = document.createElement('ul');
  customNavList.className = 'custom-nav-list';
  
  // Portal Home link removed - now using the persistent Portal button instead
  
  // Get the current page URL to highlight active items
  const currentPath = window.location.pathname;
  
  // Parse the navigation from the sidebar
  const navItems = [];
  const processedSections = new Set(); // Track processed sections to prevent duplicates
  
  // Get the navigation items from the sidebar
  const sidebarItems = document.querySelectorAll('.md-nav--primary > .md-nav__list > .md-nav__item');
  
  sidebarItems.forEach(function(item) {
    // Process all navigation items including Home
    const titleElement = item.querySelector('.md-nav__link');
    if (!titleElement) return;
    
    const title = titleElement.textContent.trim();
    
    // Skip if we've already processed this section
    if (processedSections.has(title)) return;
    processedSections.add(title);
    
    const href = titleElement.getAttribute('href') || '#';
    
    // Check if this item has children (dropdown)
    const hasChildren = item.querySelector('.md-nav__item');
    
    // Create the nav item
    const navItem = {
      title: title,
      href: href,
      children: [],
      isActive: item.classList.contains('md-nav__item--active')
    };
    
    // If it has children, get them
    if (hasChildren) {
      const childItems = item.querySelectorAll(':scope > .md-nav > .md-nav__list > .md-nav__item > .md-nav__link');
      const processedChildren = new Set(); // Track processed children to prevent duplicates
      
      childItems.forEach(function(childItem) {
        const childTitle = childItem.textContent.trim();
        
        // Skip if we've already processed this child
        if (processedChildren.has(childTitle)) return;
        processedChildren.add(childTitle);
        
        const childHref = childItem.getAttribute('href') || '#';
        const isChildActive = childItem.parentElement.classList.contains('md-nav__item--active');
        
        navItem.children.push({
          title: childTitle,
          href: childHref,
          isActive: isChildActive
        });
      });
    }
    
    navItems.push(navItem);
  });
  
  // Create the navigation items
  navItems.forEach(function(item) {
    const customNavItem = document.createElement('li');
    customNavItem.className = 'custom-nav-item';
    if (item.isActive) {
      customNavItem.classList.add('active');
    }
    
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
        if (child.isActive) {
          dropdownListItem.classList.add('active');
        }
        
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
