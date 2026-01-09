
"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';

import { 
  Search, MapPin, Bell, Bike, 
  Wrench, Fan, Tv, Refrigerator, Smartphone, Laptop,
  ChevronRight, Loader2, Navigation,
  Moon, Sun, Home, Cpu, Phone, Printer, Microwave, Tablet, Monitor,
  X, Star, Clock, Shield, Check, Users, Wind, Droplets, Thermometer,
  Grid3x3, ShoppingCart, User, Plus, Minus, ChevronLeft, Image
} from 'lucide-react';
import Link from 'next/link';
import { useRouter} from 'next/navigation';

export default function HomePage() {
  const router=useRouter();
  const [activeTab, setActiveTab] = useState('Service');
  const [showDepartmentSheet, setShowDepartmentSheet] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showCategoryPopup, setShowCategoryPopup] = useState(false);
  const [showChildCategoryPopup, setShowChildCategoryPopup] = useState(false);
  const [activeService, setActiveService] = useState<any>(null);
  const [activeSubCategory, setActiveSubCategory] = useState<any>(null);
  const [activeChildCategory, setActiveChildCategory] = useState<any>(null);
  const [subCategories, setSubCategories] = useState<any[]>([]);
  const [childCategories, setChildCategories] = useState<any[]>([]);
  const [loadingSubCategories, setLoadingSubCategories] = useState(false);
  const [loadingChildCategories, setLoadingChildCategories] = useState(false);
  const [servicesFromApi, setServicesFromApi] = useState<any[]>([]);
  const [loadingServices, setLoadingServices] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [location, setLocation] = useState('Loading...');
  const [selectedCategoryData, setSelectedCategoryData] = useState<any>(null);
  const [currentLevel, setCurrentLevel] = useState<'main' | 'sub' | 'child'>('main');
  const [popupHistory, setPopupHistory] = useState<any[]>([]);
  const [childPopupHistory, setChildPopupHistory] = useState<any[]>([]);

  const [loadingLocation, setLoadingLocation] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [quantities, setQuantities] = useState<Record<number, number>>({});

  const tabs = ['Service', 'Shopping', 'Resell'];
  
  // Departments with icons
  const departments = [
    { 
      id: 'all',
      name: 'All', 
      icon: '📋', 
      bgColor: 'bg-gray-100',
      darkBgColor: 'bg-gray-700'
    },
    { 
      id: 'Home Appliances',
      name: 'Home\nAppliances', 
      icon: '🏠', 
      bgColor: 'bg-blue-50',
      darkBgColor: 'bg-blue-900/30'
    },
    { 
      id: 'Computer',
      name: 'Computer', 
      icon: '💻', 
      bgColor: 'bg-green-50',
      darkBgColor: 'bg-green-900/30'
    },
    { 
      id: 'Mobile',
      name: 'Mobile', 
      icon: '📱', 
      bgColor: 'bg-purple-50',
      darkBgColor: 'bg-purple-900/30'
    },
  ];

  // Service icon mapping (fallback if no imageUri)
  const serviceIcons: Record<string, any> = {
    'AC': <Wind size={24} className="text-blue-600" />,
    'AC Repair': <Wind size={24} className="text-blue-600" />,
    'Fan': <Fan size={24} className="text-blue-600" />,
    'TV': <Tv size={24} className="text-blue-600" />,
    'Fridge': <Refrigerator size={24} className="text-blue-600" />,
    'Refrigerator': <Refrigerator size={24} className="text-blue-600" />,
    'Mobile': <Smartphone size={24} className="text-purple-600" />,
    'Mobile Repair': <Smartphone size={24} className="text-purple-600" />,
    'Laptop': <Laptop size={24} className="text-green-600" />,
    'Laptop Repair': <Laptop size={24} className="text-green-600" />,
    'Washing Machine': <Wrench size={24} className="text-blue-600" />,
    'Microwave': <Microwave size={24} className="text-blue-600" />,
    'Water Purifier': <Droplets size={24} className="text-blue-600" />,
    'Geyser': <Thermometer size={24} className="text-blue-600" />,
    'Kitchen Chimney': <Wind size={24} className="text-blue-600" />,
    'Desktop Repair': <Monitor size={24} className="text-green-600" />,
    'Printer Repair': <Printer size={24} className="text-green-600" />,
    'Data Recovery': <Cpu size={24} className="text-green-600" />,
    'Network Setup': <Cpu size={24} className="text-green-600" />,
    'Software Installation': <Cpu size={24} className="text-green-600" />,
    'Tablet Repair': <Tablet size={24} className="text-purple-600" />,
    'Screen Replacement': <Smartphone size={24} className="text-purple-600" />,
    'Battery Replacement': <Smartphone size={24} className="text-purple-600" />,
    'Software Update': <Smartphone size={24} className="text-purple-600" />,
    'Water Damage Repair': <Smartphone size={24} className="text-purple-600" />,
  };

  // Background color mapping based on department
  const getServiceStyle = (service: any) => {
    let bgColor = 'bg-blue-50';
    let darkBgColor = 'bg-blue-900/20';
    let iconColor = 'text-blue-600';

    if (service.parentId === 'Computer') {
      bgColor = 'bg-green-50';
      darkBgColor = 'bg-green-900/20';
      iconColor = 'text-green-600';
    } else if (service.parentId === 'Mobile') {
      bgColor = 'bg-purple-50';
      darkBgColor = 'bg-purple-900/20';
      iconColor = 'text-purple-600';
    }

    return { bgColor, darkBgColor, iconColor };
  };

  // Helper function to check MAIN CATEGORY visibility with ALL conditions - FIXED
  const checkMainCategoryVisibility = (service: any) => {
    console.log('Checking main category visibility for:', service.name || service.serviceName);
    
    // 1. First check: isMainCategoryVisible
    if (service.isMainCategoryVisible === false) {
      console.log('❌ Main category not visible (isMainCategoryVisible = false)');
      return false;
    }
    
    // 2. Check if we have at least name OR image to show (NOT AND - this was the issue)
    const hasVisibleName = service.isMainCategoryNameVisible !== false;
    const hasVisibleImage = service.isMainCategoryImageVisible !== false;
    
    console.log('Visibility check:', {
      name: service.name || service.serviceName,
      hasVisibleName,
      hasVisibleImage,
      isMainCategoryNameVisible: service.isMainCategoryNameVisible,
      isMainCategoryImageVisible: service.isMainCategoryImageVisible
    });
    
    if (!hasVisibleName && !hasVisibleImage) {
      console.log('❌ Neither name nor image is visible');
      return false;
    }
    
    console.log('✅ Main category visible');
    return true;
  };

  // Helper function to check SUB/CHILD category visibility - UPDATED FOR SUBCATEGORY VISIBILITY
  const checkSubChildVisibility = (item: any) => {
    console.log('Checking sub/child visibility for:', item.name || item.title);
    
    // Check if it's a subcategory (has specific subcategory visibility fields)
    const hasSubCategoryFields = item.isSubCategoryVisible !== undefined || 
                                 item.isSubCategoryImageVisible !== undefined || 
                                 item.isSubCategoryNameVisible !== undefined;
    
    if (hasSubCategoryFields) {
      console.log('Subcategory visibility check:', {
        isSubCategoryVisible: item.isSubCategoryVisible,
        isSubCategoryImageVisible: item.isSubCategoryImageVisible,
        isSubCategoryNameVisible: item.isSubCategoryNameVisible,
        name: item.name || item.title
      });
      
      // 1. First check: isSubCategoryVisible
      if (item.isSubCategoryVisible === false) {
        console.log('❌ Subcategory not visible (isSubCategoryVisible = false)');
        return false;
      }
      
      // 2. Check image visibility requirements
      if (item.isSubCategoryImageVisible === true) {
        // If image should be visible, check if imageUri exists and is valid
        if (!item.imageUri || item.imageUri === '' || item.imageUri === null) {
          console.log('❌ Subcategory image should be visible but imageUri is missing');
          return false;
        }
      }
      
      // 3. Check name visibility requirements
      if (item.isSubCategoryNameVisible === true) {
        // If name should be visible, check if name exists
        if (!item.name || item.name.trim() === '') {
          console.log('❌ Subcategory name should be visible but name is missing');
          return false;
        }
      }
      
      // 4. Check if at least one of name or image is visible
      const hasVisibleName = item.isSubCategoryNameVisible !== false;
      const hasVisibleImage = item.isSubCategoryImageVisible !== false;
      
      if (!hasVisibleName && !hasVisibleImage) {
        console.log('❌ Neither subcategory name nor image is visible');
        return false;
      }
      
      console.log('✅ Subcategory visible');
      return true;
    } else {
      // For child categories (without subcategory-specific fields)
      // Check multiple visibility fields
      if (item.visibility === false || item.visible === false || item.status === 'inactive') {
        return false;
      }
      
      // Check if imageUri exists and is valid
      if (!item.imageUri || item.imageUri === '' || item.imageUri === null) {
        return false;
      }
      
      // Check if name/title exists
      if ((!item.name || item.name.trim() === '') && (!item.title || item.title.trim() === '')) {
        return false;
      }
      
      return true;
    }
  };

  // Function to check child category visibility specifically for "Services", "Repair", "Installation"
  const checkChildCategoryVisibility = (item: any) => {
    console.log('Checking child category visibility for:', item.name || item.title);
    
    // For child categories, check if visibility is true
    if (item.visibility === false || item.visible === false) {
      console.log('❌ Child category not visible (visibility = false)');
      return false;
    }
    
    // Check if name exists
    if (!item.name || item.name.trim() === '') {
      console.log('❌ Child category name is missing');
      return false;
    }
    
    console.log('✅ Child category visible');
    return true;
  };

  // Function to render subcategory image or icon based on visibility
  const renderSubCategoryImage = (item: any) => {
    const categoryName = item.name || item.title || 'Category';
    
    // Check if image should be visible for subcategory
    if (item.isSubCategoryImageVisible === true) {
      if (item.imageUri) {
        return (
          <img
            src={item.imageUri}
            alt={categoryName}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.currentTarget;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                const fallback = document.createElement('div');
                fallback.className = 'flex items-center justify-center w-full h-full';
                fallback.innerHTML = '<span class="text-2xl">📱</span>';
                parent.appendChild(fallback);
              }
            }}
          />
        );
      } else {
        // Show fallback if image should be visible but is missing
        return <span className="text-2xl">📱</span>;
      }
    } else if (item.isSubCategoryImageVisible === false) {
      // Image should not be shown, show placeholder or nothing
      return <span className="text-2xl">📱</span>;
    } else {
      // Default behavior if isSubCategoryImageVisible is not defined
      if (item.imageUri) {
        return (
          <img
            src={item.imageUri}
            alt={categoryName}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.currentTarget;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                const fallback = document.createElement('div');
                fallback.className = 'flex items-center justify-center w-full h-full';
                fallback.innerHTML = '<span class="text-2xl">📱</span>';
                parent.appendChild(fallback);
              }
            }}
          />
        );
      } else {
        return <span className="text-2xl">📱</span>;
      }
    }
  };

  // Function to render subcategory name based on visibility
  const renderSubCategoryName = (item: any) => {
    const categoryName = item.name || item.title || 'Category';
    
    // Check if name should be visible for subcategory
    if (item.isSubCategoryNameVisible === false) {
      return null; // Don't show name
    } else if (item.isSubCategoryNameVisible === true) {
      // Name should be visible, check if it exists
      if (!categoryName || categoryName.trim() === '') {
        return null;
      }
      return (
        <p className="text-xs font-semibold text-center text-gray-800 dark:text-gray-200 leading-tight">
          {categoryName}
        </p>
      );
    } else {
      // Default behavior if isSubCategoryNameVisible is not defined
      if (!categoryName || categoryName.trim() === '') {
        return null;
      }
      return (
        <p className="text-xs font-semibold text-center text-gray-800 dark:text-gray-200 leading-tight">
          {categoryName}
        </p>
      );
    }
  };

  // Handle service click - check if hasSubCategory
  const handleServiceClick = async (service: any) => {
    // First check main service visibility
    if (!checkMainCategoryVisibility(service)) {
      console.log('Main service not visible:', service);
      return;
    }

    setActiveService(service);
    setLoadingSubCategories(true);
    setCurrentLevel('sub');
    setPopupHistory([service]);

    console.log('Service data:', {
      name: service.name || service.serviceName,
      _id: service._id,
      hasSubCategory: service.hasSubCategory
    });

    // Always try to fetch subcategories first
    console.log('Fetching subcategories for service ID:', service._id);
    try {
      const subResponse = await fetchSubCategories(service._id);
      console.log('Subcategories found:', subResponse.length);
      
      if (subResponse.length > 0) {
        // Show subcategories
        setSubCategories(subResponse);
        setShowCategoryPopup(true);
      } else {
        // If no subcategories, fetch child categories directly
        console.log('No subcategories found, fetching child categories directly');
        const childResponse = await fetchChildCategories(service._id);
        
        if (childResponse.length > 0) {
          // Show child categories
          setSubCategories(childResponse);
          setCurrentLevel('child');
          setShowCategoryPopup(true);
        } else {
          // If no child categories either, open service modal directly
          console.log('No child categories found, opening service modal directly');
          setSelectedCategoryData({
            ...service,
            name: service.name || service.serviceName,
            imageUri: service.imageUri
          });
          setShowServiceModal(true);
        }
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      // Fallback: Open service modal directly
      setSelectedCategoryData({
        ...service,
        name: service.name || service.serviceName,
        imageUri: service.imageUri
      });
      setShowServiceModal(true);
    } finally {
      setLoadingSubCategories(false);
    }
  };

  // Function to fetch subcategories - UPDATED FOR VISIBILITY CHECKING
  const fetchSubCategories = async (mainId: string) => {
    try {
      const res = await axios.get(
        `https://api.bijliwalaaya.in/api/product-listing/main/${mainId}/sub`,
        {
          headers: { 
            'x-api-token': 'super_secure_token',
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Subcategories API response:', res.data);

      if (res.data?.success) {
        let subList = [];
        
        // Handle nested object format from API
        if (res.data.data && typeof res.data.data === 'object') {
          // Convert object to array
          subList = Object.keys(res.data.data).map(key => ({
            _id: key,
            ...res.data.data[key]
          }));
          console.log('Converted subcategories from object:', subList.length);
        } else if (Array.isArray(res.data.data)) {
          subList = res.data.data;
        } else if (res.data.subCategories) {
          subList = res.data.subCategories;
        }
        
        // Filter by visibility using updated checkSubChildVisibility function
        const visibleSubList = subList.filter((item: any) => checkSubChildVisibility(item));
        
        console.log('All subcategories from API:', subList.length);
        console.log('Visible subcategories after filtering:', visibleSubList.length);
        
        // Log details of visible subcategories
        console.log('Visible subcategories details:', visibleSubList.map((item: any) => ({
          name: item.name || item.title,
          _id: item._id,
          isSubCategoryVisible: item.isSubCategoryVisible,
          isSubCategoryImageVisible: item.isSubCategoryImageVisible,
          isSubCategoryNameVisible: item.isSubCategoryNameVisible,
          imageUri: item.imageUri ? 'Yes' : 'No'
        })));
        
        return visibleSubList;
      }
      return [];
    } catch (error) {
      console.error('Error fetching subcategories:', error);
      throw error;
    }
  };

  // Function to fetch child categories (for main category)
  const fetchChildCategories = async (mainId: string) => {
    try {
      const res = await axios.get(
        `https://api.bijliwalaaya.in/api/product-listing/main/${mainId}/child`,
        {
          headers: { 
            'x-api-token': 'super_secure_token',
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Child categories API response (main):', res.data);

      if (res.data?.success) {
        let childList = [];
        
        // Handle nested object format
        if (res.data.data && typeof res.data.data === 'object') {
          // Convert object to array
          childList = Object.keys(res.data.data).map(key => ({
            _id: key,
            ...res.data.data[key]
          }));
        } else if (Array.isArray(res.data.data)) {
          childList = res.data.data;
        } else if (res.data.children) {
          childList = res.data.children;
        }
        
        // Filter by visibility
        const visibleChildList = childList.filter((item: any) => checkSubChildVisibility(item));
        console.log('Visible child categories:', visibleChildList.length);
        console.log('Child categories details:', visibleChildList.map((item: any) => ({
          name: item.name || item.title,
          _id: item._id
        })));
        
        return visibleChildList;
      }
      return [];
    } catch (error) {
      console.error('Error fetching child categories (main):', error);
      throw error;
    }
  };

  // Function to fetch child categories (for subcategory)
  const fetchChildCategoriesForSub = async (mainId: string, subId: string) => {
    try {
      console.log(`Fetching child categories for mainId: ${mainId}, subId: ${subId}`);
      
      const res = await axios.get(
        `https://api.bijliwalaaya.in/api/product-listing/main/${mainId}/sub/${subId}/child`,
        {
          headers: { 
            'x-api-token': 'super_secure_token',
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Child categories API response (sub):', res.data);

      if (res.data?.success) {
        let childList = [];
        
        // Handle nested object format
        if (res.data.data && typeof res.data.data === 'object') {
          // Convert object to array
          childList = Object.keys(res.data.data).map(key => ({
            _id: key,
            ...res.data.data[key]
          }));
          console.log('Converted child categories from object:', childList.length);
        } else if (Array.isArray(res.data.data)) {
          childList = res.data.data;
        } else if (res.data.children) {
          childList = res.data.children;
        }
        
        // Filter by visibility
        const visibleChildList = childList.filter((item: any) => checkSubChildVisibility(item));
        console.log('Visible child categories (sub):', visibleChildList.length);
        console.log('Child categories details:', visibleChildList.map((item: any) => ({
          name: item.name || item.title,
          _id: item._id
        })));
        
        return visibleChildList;
      }
      console.log('No success response for child categories');
      return [];
    } catch (error: any) {
      console.error('Error fetching child categories (sub):', error.message || error);
      // Try alternative endpoint
      try {
        console.log('Trying alternative endpoint for child categories');
        const altRes = await axios.get(
          `https://api.bijliwalaaya.in/api/product-listing/sub/${subId}/child`,
          {
            headers: { 
              'x-api-token': 'super_secure_token',
              'Content-Type': 'application/json'
            }
          }
        );
        
        if (altRes.data?.success) {
          let childList = [];
          if (altRes.data.data && typeof altRes.data.data === 'object') {
            childList = Object.keys(altRes.data.data).map(key => ({
              _id: key,
              ...altRes.data.data[key]
            }));
          } else if (Array.isArray(altRes.data.data)) {
            childList = altRes.data.data;
          }
          
          const visibleChildList = childList.filter((item: any) => checkSubChildVisibility(item));
          return visibleChildList;
        }
      } catch (altError) {
        console.error('Alternative endpoint also failed:', altError);
      }
      
      throw error;
    }
  };

  // NEW: Simplified function to fetch child category services - FIXED
  const fetchChildCategoryServices = async (mainId: string, subId: string, childId: string) => {
    try {
      console.log(`Fetching child category services for mainId: ${mainId}, subId: ${subId}, childId: ${childId}`);
      
      // Try multiple endpoints - FIXED APPROACH
      const endpoints = [
        `https://api.bijliwalaaya.in/api/product-listing/main/${mainId}/sub/${subId}/child/${childId}/services`,
        `https://api.bijliwalaaya.in/api/product-listing/child/${childId}/services`,
        `https://api.bijliwalaaya.in/api/product-listing/child-category/${childId}/services`
      ];

      let servicesList = [];

      for (const endpoint of endpoints) {
        try {
          console.log(`Trying endpoint: ${endpoint}`);
          const res = await axios.get(endpoint, {
            headers: { 
              'x-api-token': 'super_secure_token',
              'Content-Type': 'application/json'
            }
          });

          console.log(`Response from ${endpoint}:`, res.data);

          if (res.data?.success) {
            if (res.data.data && typeof res.data.data === 'object') {
              // Convert object to array
              servicesList = Object.keys(res.data.data).map(key => ({
                _id: key,
                ...res.data.data[key]
              }));
            } else if (Array.isArray(res.data.data)) {
              servicesList = res.data.data;
            } else if (Array.isArray(res.data.services)) {
              servicesList = res.data.services;
            } else if (res.data.services && typeof res.data.services === 'object') {
              servicesList = Object.keys(res.data.services).map(key => ({
                _id: key,
                ...res.data.services[key]
              }));
            }
            
            if (servicesList.length > 0) {
              console.log(`Found ${servicesList.length} services from ${endpoint}`);
              break;
            }
          }
        } catch (err) {
          console.log(`Endpoint ${endpoint} failed:`, err.message);
          continue;
        }
      }

      // If still no services, use default child categories
      if (servicesList.length === 0) {
        console.log('No services found from APIs, using default child categories');
        
        // FIRST CHECK: Try to get child category details to see if it has childCategory field
        try {
          const childDetailsRes = await axios.get(
            `https://api.bijliwalaaya.in/api/product-listing/child/${childId}`,
            {
              headers: { 
                'x-api-token': 'super_secure_token',
                'Content-Type': 'application/json'
              }
            }
          );

          console.log('Child details response:', childDetailsRes.data);

          if (childDetailsRes.data?.success) {
            const childData = childDetailsRes.data.data || childDetailsRes.data.child || {};
            
            // Check if child category has childCategory field (Services, Repair, Installation)
            if (childData.childCategory && Array.isArray(childData.childCategory)) {
              servicesList = childData.childCategory.filter((item: any) => 
                item.visibility !== false && item.name
              );
              console.log('Found childCategory in child details:', servicesList);
            }
          }
        } catch (childDetailsError) {
          console.log('Could not fetch child details:', childDetailsError.message);
        }
      }

      // If still no services, use hardcoded default
      if (servicesList.length === 0) {
        console.log('Using hardcoded default child categories');
        servicesList = [
          { 
            _id: '1', 
            name: 'Services', 
            title: 'Services', 
            visibility: true,
            description: 'General service options',
            serviceCharges: '₹499',
            serviceDuration: '30-60 mins',
            imageUri: ''
          },
          // { 
          //   _id: '2', 
          //   name: 'Repair', 
          //   title: 'Repair', 
          //   visibility: true,
          //   description: 'Repair service options',
          //   serviceCharges: '₹599',
          //   serviceDuration: '45-90 mins',
          //   imageUri: ''
          // },
          { 
            _id: '3', 
            name: 'Installation', 
            title: 'Installation', 
            visibility: true,
            description: 'Installation service options',
            serviceCharges: '₹399',
            serviceDuration: '60-120 mins',
            imageUri: ''
          }
        ];
      }

      // Filter by visibility for child category services
      const visibleServicesList = servicesList.filter((item: any) => 
        checkChildCategoryVisibility(item)
      );
      
      console.log('Final visible child category services:', visibleServicesList.length);
      console.log('Services details:', visibleServicesList.map((item: any) => ({
        name: item.name || item.title,
        _id: item._id,
        visibility: item.visibility,
        serviceCharges: item.serviceCharges
      })));
      
      return visibleServicesList;
    } catch (error: any) {
      console.error('Error in fetchChildCategoryServices:', error.message || error);
      
      // Fallback to default child categories
      console.log('Error occurred, returning default child categories');
      return [
        { 
          _id: '1', 
          name: 'Services', 
          title: 'Services', 
          visibility: true,
          description: 'General service options',
          serviceCharges: '₹499',
          serviceDuration: '30-60 mins',
          imageUri: ''
        },
        { 
          _id: '2', 
          name: 'Repair', 
          title: 'Repair', 
          visibility: true,
          description: 'Repair service options',
          serviceCharges: '₹599',
          serviceDuration: '45-90 mins',
          imageUri: ''
        },
        { 
          _id: '3', 
          name: 'Installation', 
          title: 'Installation', 
          visibility: true,
          description: 'Installation service options',
          serviceCharges: '₹399',
          serviceDuration: '60-120 mins',
          imageUri: ''
        }
      ];
    }
  };

  // Handle subcategory click - fetch child categories
  const handleSubCategoryClick = async (sub: any) => {
    router.push('/services')
    // Check subcategory visibility
    if (!checkSubChildVisibility(sub)) {
      console.log('Subcategory not visible:', sub);
      return;
    }

    if (!activeService?._id || !sub?._id) {
      console.log('Missing IDs:', { activeServiceId: activeService?._id, subId: sub?._id });
      return;
    }

    setActiveSubCategory(sub);
    setLoadingSubCategories(true);
    setCurrentLevel('child');
    setPopupHistory(prev => [...prev, sub]);

    try {
      console.log('Fetching child categories for subcategory:', {
        mainId: activeService._id,
        subId: sub._id,
        subName: sub.name || sub.title
        
      });

      const childResponse = await fetchChildCategoriesForSub(activeService._id, sub._id);
      
      console.log('Child categories found:', childResponse.length);

      if (childResponse.length > 0) {
        // Show child categories
        setSubCategories(childResponse);
      } 
    } catch (error) {
      console.error('Failed to fetch child categories:', error);
     
      setShowCategoryPopup(false);
      setShowServiceModal(true);
    } finally {
      setLoadingSubCategories(false);
    }
  };

  // Handle child category click - UPDATED: Always show child category popup
  const handleChildCategoryClick = async (child: any) => {
    // Check child category visibility
    if (!checkSubChildVisibility(child)) {
      console.log('Child category not visible:', child);
      return;
    }
    console.log('Child category selected:', {
      name: child.name || child.title,
      imageUri: child.imageUri,
      serviceCharges: child.serviceCharges,
      _id: child._id
    });

    // Store the child category
    setActiveChildCategory(child);
    setLoadingChildCategories(true);
    setChildPopupHistory([child]);

    try {
      // ALWAYS SHOW CHILD CATEGORY POPUP with Services, Repair, Installation
      console.log('Fetching child category services for:', {
        mainId: activeService?._id,
        subId: activeSubCategory?._id,
        childId: child._id
      });

      // Try to fetch from API first
      let childServices = [];
      
      if (activeService?._id && activeSubCategory?._id && child._id) {
        childServices = await fetchChildCategoryServices(
          activeService._id, 
          activeSubCategory._id, 
          child._id
        );
      } else {
        // If missing IDs, use hardcoded services
        childServices = [
          { 
            _id: '1', 
            name: 'Services', 
            title: 'Services', 
            visibility: true,
            description: 'General service options',
            serviceCharges: '₹499',
            serviceDuration: '30-60 mins'
          },
         
          { 
            _id: '3', 
            name: 'Installation', 
            title: 'Installation', 
            visibility: true,
            description: 'Installation service options',
            serviceCharges: '₹399',
            serviceDuration: '60-120 mins'
          }
        ];
      }
      
      console.log('Child category services found:', childServices.length);
      
      // ALWAYS show child category popup, even if empty
      setChildCategories(childServices);
      setShowCategoryPopup(false); // Close previous popup
      setTimeout(() => {
        setShowChildCategoryPopup(true); // Show child category popup
      }, 100);
      
    } catch (error) {
      console.error('Failed to fetch child category services:', error);
      
      // Even on error, show child category popup with defaults
     
      
      setShowCategoryPopup(false);
      setTimeout(() => {
        setShowChildCategoryPopup(true);
      }, 100);
    } finally {
      setLoadingChildCategories(false);
    }
  };

  // Handle child category service click (Services, Repair, Installation)
  const handleChildCategoryServiceClick = (service: any) => {
    // Check service visibility
    if (!checkChildCategoryVisibility(service)) {
      console.log('Child category service not visible:', service);
      return;
    }

    console.log('Child category service selected:', {
      name: service.name || service.title,
      serviceCharges: service.serviceCharges,
      description: service.description
    });

    // Set the selected category data with service details
    setSelectedCategoryData({
      ...activeService,
      ...(activeSubCategory || {}),
      ...(activeChildCategory || {}),
      ...service,
      name: service.name || service.title || activeChildCategory?.name || activeService.name,
      serviceCharges: service.serviceCharges || activeChildCategory?.serviceCharges || '₹599',
      serviceDuration: service.serviceDuration || activeChildCategory?.serviceDuration || '45-60 mins',
      rating: service.rating || activeChildCategory?.rating || '4.5',
      warranty: service.warranty || activeChildCategory?.warranty || '30 Days',
      description: service.description || `Professional ${service.name || service.title} service`
    });
    
    // Close child category popup and open service modal
    setShowChildCategoryPopup(false);
    setTimeout(() => {
      setShowServiceModal(true);
    }, 100);
  };

  // Handle back button in popup
  const handlePopupBack = () => {
    if (popupHistory.length > 1) {
      // Remove current level
      const newHistory = popupHistory.slice(0, -1);
      setPopupHistory(newHistory);
      
      const previousLevel = newHistory[newHistory.length - 1];
      
      if (newHistory.length === 1) {
        // Go back to subcategories (main service)
        setCurrentLevel('sub');
        setActiveSubCategory(null);
        
        // Re-fetch subcategories for the main service
        if (activeService) {
          setLoadingSubCategories(true);
          fetchSubCategories(activeService._id)
            .then((subResponse) => {
              setSubCategories(subResponse);
            })
            .catch((error) => {
              console.error('Error fetching subcategories on back:', error);
              setShowCategoryPopup(false);
            })
            .finally(() => {
              setLoadingSubCategories(false);
            });
        }
      } else {
        // Go back to previous subcategory
        setActiveSubCategory(previousLevel);
        setCurrentLevel('sub');
        setSubCategories([]);
      }
    } else {
      // Close popup if at first level
      setShowCategoryPopup(false);
      setActiveService(null);
      setActiveSubCategory(null);
      setCurrentLevel('main');
      setPopupHistory([]);
    }
  };

  // Handle back button in child category popup
  const handleChildPopupBack = () => {
    if (childPopupHistory.length > 1) {
      // Remove current level
      const newHistory = childPopupHistory.slice(0, -1);
      setChildPopupHistory(newHistory);
    } else {
      // Close child popup and go back to category popup
      setShowChildCategoryPopup(false);
      setTimeout(() => {
        setShowCategoryPopup(true);
      }, 100);
      setChildCategories([]);
      setActiveChildCategory(null);
      setChildPopupHistory([]);
    }
  };

  // Service Category Popup Component
  const ServiceCategoryPopup = () => {
    if (!showCategoryPopup || !activeService) return null;

    const serviceName = activeService.name || activeService.serviceName;
    const subCategoryName = activeSubCategory?.name || activeSubCategory?.title;
    
    const getPopupTitle = () => {
      if (currentLevel === 'sub') {
        return 'Select Sub Category';
      } else if (currentLevel === 'child' && activeSubCategory) {
        return `Select ${subCategoryName}`;
      } else {
        return 'Select Service Type';
      }
    };

    const getPopupSubtitle = () => {
      if (currentLevel === 'sub') {
        return serviceName;
      } else if (currentLevel === 'child' && activeSubCategory) {
        return `${serviceName} • ${subCategoryName}`;
      } else {
        return serviceName;
      }
    };

    return (
      <div className="fixed inset-0 z-[999] flex items-center justify-center">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => {
            setShowCategoryPopup(false);
            setSubCategories([]);
            setActiveService(null);
            setActiveSubCategory(null);
            setCurrentLevel('main');
            setPopupHistory([]);
          }}
        />

        {/* Modal */}
        <div className="relative w-[340px] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-4 max-h-[80vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-start justify-between mb-4 sticky top-0 bg-white dark:bg-gray-800 pt-2 pb-2">
            <div className="flex items-center gap-2">
              {popupHistory.length > 1 && (
                <button
                  onClick={handlePopupBack}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors mr-1"
                >
                  <ChevronLeft size={16} className="text-gray-600 dark:text-gray-300" />
                </button>
              )}
              <div>
                <span className="text-[10px] font-bold text-yellow-500 uppercase">
                  {getPopupSubtitle()}
                </span>
                <h2 className="text-lg font-bold text-gray-900 dark:text-gray-200">
                  {getPopupTitle()}
                </h2>
              </div>
            </div>

            <button
              onClick={() => {
                setShowCategoryPopup(false);
                setSubCategories([]);
                setActiveService(null);
                setActiveSubCategory(null);
                setCurrentLevel('main');
                setPopupHistory([]);
              }}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <X size={16} className="text-gray-600 dark:text-gray-300" />
            </button>
          </div>

          {/* Content */}
          {loadingSubCategories ? (
            <div className="flex flex-col justify-center items-center py-10">
              <Loader2 size={24} className="animate-spin text-yellow-500" />
              <span className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Loading {currentLevel === 'sub' ? 'sub categories' : 'services'}...
              </span>
            </div>
          ) : subCategories.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                No {currentLevel === 'sub' ? 'sub categories' : 'services'} found
              </p>
              <button
                onClick={() => {
                  setShowCategoryPopup(false);
                  setSelectedService(serviceName);
                  setShowServiceModal(true);
                }}
                className="px-4 py-2 bg-yellow-500 text-gray-900 rounded-lg font-medium hover:bg-yellow-600 transition-colors"
              >
                Continue to Service
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-3">
              {subCategories.map((cat: any, idx: number) => {
                const categoryName = cat.name || cat.title || `Category ${idx + 1}`;
                const categoryDesc = cat.description || '';
                
                // Check if category is visible before rendering
                if (!checkSubChildVisibility(cat)) {
                  return null;
                }
                
                return (
                  <button
                    key={cat._id || idx}
                    onClick={() => {
                      if (currentLevel === 'sub') {
                        handleSubCategoryClick(cat);
                      } else {
                        handleChildCategoryClick(cat);
                      }
                    }}
                    className="bg-gray-50 dark:bg-gray-700 rounded-xl p-3 flex flex-col items-center active:scale-95 transition-all hover:bg-gray-100 dark:hover:bg-gray-600 min-h-[120px]"
                  >
                    <div className="w-14 h-14 bg-white dark:bg-gray-600 rounded-lg flex items-center justify-center mb-2 overflow-hidden border border-gray-200 dark:border-gray-500">
                      {renderSubCategoryImage(cat)}
                    </div>

                    {renderSubCategoryName(cat)}
                    
                    {categoryDesc && (
                      <p className="text-[10px] text-gray-500 dark:text-gray-400 text-center mt-1">
                        {categoryDesc.length > 20 ? categoryDesc.substring(0, 20) + '...' : categoryDesc}
                      </p>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* Footer info */}
          <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-center text-gray-500 dark:text-gray-400">
              Showing {subCategories.length} {currentLevel === 'sub' ? 'sub categories' : 'services'}
            </p>
          </div>
        </div>
      </div>
    );
  };

  // Child Category Popup Component (Services, Repair, Installation) - FIXED
  const ChildCategoryPopup = () => {
    if (!showChildCategoryPopup) return null;

    const childCategoryName = activeChildCategory?.name || activeChildCategory?.title || 'Service Type';
    const serviceName = activeService?.name || activeService?.serviceName || 'Service';
    const subCategoryName = activeSubCategory?.name || activeSubCategory?.title || '';

    return (
      <div className="fixed inset-0 z-[1000] flex items-center justify-center">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => {
            setShowChildCategoryPopup(false);
            setChildCategories([]);
            setActiveChildCategory(null);
            setChildPopupHistory([]);
          }}
        />

        {/* Modal */}
        <div className="relative w-[340px] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-4 max-h-[80vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-start justify-between mb-4 sticky top-0 bg-white dark:bg-gray-800 pt-2 pb-2">
            <div className="flex items-center gap-2">
              <button
                onClick={handleChildPopupBack}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors mr-1"
              >
                <ChevronLeft size={16} className="text-gray-600 dark:text-gray-300" />
              </button>
              <div>
                <span className="text-[10px] font-bold text-yellow-500 uppercase">
                  {serviceName} • {subCategoryName}
                </span>
                <h2 className="text-lg font-bold text-gray-900 dark:text-gray-200">
                  Select Service Type
                </h2>
              </div>
            </div>

            <button
              onClick={() => {
                setShowChildCategoryPopup(false);
                setChildCategories([]);
                setActiveChildCategory(null);
                setChildPopupHistory([]);
              }}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <X size={16} className="text-gray-600 dark:text-gray-300" />
            </button>
          </div>

          {/* Content */}
          {loadingChildCategories ? (
            <div className="flex flex-col justify-center items-center py-10">
              <Loader2 size={24} className="animate-spin text-yellow-500" />
              <span className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Loading services...
              </span>
            </div>
          ) : childCategories.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                No services found
              </p>
              <button
                onClick={() => {
                  setShowChildCategoryPopup(false);
                  setSelectedCategoryData({
                    ...activeService,
                    ...(activeSubCategory || {}),
                    ...activeChildCategory,
                    name: childCategoryName,
                    serviceCharges: '₹599',
                    serviceDuration: '45-60 mins'
                  });
                  setShowServiceModal(true);
                }}
                className="px-4 py-2 bg-yellow-500 text-gray-900 rounded-lg font-medium hover:bg-yellow-600 transition-colors"
              >
                Continue to Service
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {childCategories.map((service: any, idx: number) => {
                const serviceName = service.name || service.title || `Service ${idx + 1}`;
                const serviceDesc = service.description || '';
                
                // Check if service is visible before rendering
                if (!checkChildCategoryVisibility(service)) {
                  return null;
                }
                
                return (
                  <button
                    key={service._id || idx}
                    onClick={() => handleChildCategoryServiceClick(service)}
                    className="w-full bg-gray-50 dark:bg-gray-700 rounded-xl p-4 flex items-center gap-3 active:scale-95 transition-all hover:bg-gray-100 dark:hover:bg-gray-600 text-left"
                  >
                    <div className="w-12 h-12 bg-white dark:bg-gray-600 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden border border-gray-200 dark:border-gray-500">
                      <span className="text-2xl">🔧</span>
                    </div>

                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-gray-900 dark:text-gray-200">
                        {serviceName}
                      </h3>
                      
                      {serviceDesc && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {serviceDesc}
                        </p>
                      )}
                      
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm font-bold text-yellow-500">
                          {service.serviceCharges || '₹599'}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {service.serviceDuration || '45-60 mins'}
                        </span>
                      </div>
                    </div>

                    <ChevronRight size={16} className="text-gray-400 flex-shrink-0" />
                  </button>
                );
              })}
            </div>
          )}

          {/* Footer info */}
          <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-center text-gray-500 dark:text-gray-400">
              Showing {childCategories.length} services
            </p>
          </div>
        </div>
      </div>
    );
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    
    localStorage.setItem('darkMode', newDarkMode.toString());
  };

  // Get current location
  const getCurrentLocation = async () => {
    setLoadingLocation(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const response = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`
            );
            const data = await response.json();
            if (data.city && data.countryName) {
              setLocation(`${data.city}, ${data.countryName}`);
            } else {
              setLocation('New York, USA');
            }
          } catch (error) {
            setLocation('New York, USA');
          }
          setLoadingLocation(false);
        },
        () => {
          fetch('https://ipapi.co/json/')
            .then(res => res.json())
            .then(data => {
              if (data.city && data.country_name) {
                setLocation(`${data.city}, ${data.country_name}`);
              } else {
                setLocation('New York, USA');
              }
              setLoadingLocation(false);
            })
            .catch(() => {
              setLocation('New York, USA');
              setLoadingLocation(false);
            });
        }
      );
    } else {
      fetch('https://ipapi.co/json/')
        .then(res => res.json())
        .then(data => {
          if (data.city && data.country_name) {
            setLocation(`${data.city}, ${data.country_name}`);
          } else {
            setLocation('New York, USA');
          }
          setLoadingLocation(false);
        })
        .catch(() => {
          setLocation('New York, USA');
          setLoadingLocation(false);
        });
    }
  };

  // Fetch services from API
  useEffect(() => {
    const fetchMainCategories = async () => {
      try {
        setLoadingServices(true);
        console.log('Fetching main categories...');
        
        const res = await axios.get(
          'https://api.bijliwalaaya.in/api/product-listing/main',
          {
            headers: {
              'x-api-token': "super_secure_token",
              'Content-Type': 'application/json',
            },
          }
        );

        console.log('Main categories API response:', res.data);

        if (res.data?.success) {
          let servicesData = [];
          
          // Handle object format from API
          if (res.data.data && typeof res.data.data === 'object') {
            // Convert object to array
            servicesData = Object.keys(res.data.data).map(key => ({
              _id: key,
              ...res.data.data[key]
            }));
            console.log('Converted main categories from object:', servicesData.length);
          } else if (Array.isArray(res.data.data)) {
            servicesData = res.data.data;
          }
          
          // Filter by MAIN CATEGORY visibility with ALL conditions
          const visibleServices = servicesData.filter((service: any) => 
            checkMainCategoryVisibility(service)
          );
          
          console.log('All services from API:', servicesData.length);
          console.log('Visible services after filtering:', visibleServices.length);
          
          // Add hasSubCategory property based on data
          const servicesWithSubCategory = visibleServices.map(service => ({
            ...service,
            // Check if service has subcategories (you may need to adjust this logic)
            hasSubCategory: service.hasSubCategory || undefined
          }));
          
          setServicesFromApi(servicesWithSubCategory);
        } else {
          console.error('API Error:', res.data);
          setServicesFromApi(getStaticFallbackData());
        }
      } catch (error: any) {
        console.error('Fetch failed:', error?.response?.data || error.message);
        setServicesFromApi(getStaticFallbackData());
      } finally {
        setLoadingServices(false);
      }
    };

    // Check for saved dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
      setDarkMode(true);
      document.body.classList.add('dark');
    }
    
    // Get location
    getCurrentLocation();
    
    // Fetch services
    fetchMainCategories();
  }, []);

  // Static fallback data
  const getStaticFallbackData = () => {
    return [
      {
        _id: '1',
        name: 'AC Repair',
        serviceName: 'AC Repair',
        parentId: 'Home Appliances',
        imageUri: '/images/ac-repair.jpg',
        serviceCharges: '₹599',
        serviceDuration: '45-60 mins',
        rating: '4.8',
        warranty: '45 Days',
        hasSubCategory: true,
        isMainCategoryVisible: true,
        isMainCategoryImageVisible: true,
        isMainCategoryNameVisible: true
      },
      {
        _id: '2',
        name: 'Fan Repair',
        serviceName: 'Fan Repair',
        parentId: 'Home Appliances',
        imageUri: '/images/fan-repair.jpg',
        serviceCharges: '₹299',
        serviceDuration: '30-45 mins',
        rating: '4.5',
        warranty: '30 Days',
        hasSubCategory: false,
        isMainCategoryVisible: true,
        isMainCategoryImageVisible: true,
        isMainCategoryNameVisible: true
      },
    ];
  };

  // Get filtered services based on selected department
  const getFilteredServices = () => {
    if (servicesFromApi.length === 0) {
      return getStaticFallbackData().slice(0, 6);
    }

    if (selectedDepartment === 'all') {
      return servicesFromApi.slice(0, 6);
    }

    return servicesFromApi
      .filter(service => service.parentId === selectedDepartment)
      .slice(0, 6);
  };

  // Function to render service image or icon based on visibility - UPDATED
  const renderServiceImage = (service: any, style: any) => {
    const serviceName = service.name || service.serviceName;
    const imageUri = service.imageUri;
    
    // Check if image should be visible
    const isImageVisible = service.isMainCategoryImageVisible !== false;
    
    console.log('Rendering service image:', {
      serviceName,
      isImageVisible,
      imageUri: imageUri ? 'Yes' : 'No',
      isMainCategoryImageVisible: service.isMainCategoryImageVisible
    });
    
    if (isImageVisible && imageUri) {
      return (
        <img 
          src={imageUri} 
          alt={serviceName}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
            const parent = e.currentTarget.parentElement;
            if (parent) {
              const fallbackIcon = serviceIcons[serviceName] || 
                <Wrench size={24} className={style.iconColor} />;
              const iconWrapper = document.createElement('div');
              iconWrapper.className = 'flex items-center justify-center w-full h-full';
              parent.appendChild(iconWrapper);
            }
          }}
        />
      );
    } else if (isImageVisible && !imageUri) {
      // Image should be visible but imageUri is missing, show fallback icon
      return serviceIcons[serviceName] || <Wrench size={24} className={style.iconColor} />;
    } else {
      // Image should not be visible
      return null;
    }
  };

  const handleDepartmentClick = (deptId: string) => {
    setSelectedDepartment(deptId);
    setShowDepartmentSheet(true);
  };

  const updateQuantity = (id: string, change: number) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) + change)
    }));
  };

  // Calculate total items for cart
  const totalItems = Object.values(quantities).reduce((sum, qty) => sum + qty, 0);

  // Department Sheet Component
  const DepartmentSheet = () => {
    if (!showDepartmentSheet) return null;

    const getDepartmentTitle = () => {
      switch (selectedDepartment) {
        case 'Home Appliances':
          return 'Home Appliances';
        case 'Computer':
          return 'Computer Services';
        case 'Mobile':
          return 'Mobile Services';
        default:
          return 'All Services';
      }
    };

    const getDepartmentServices = () => {
      if (selectedDepartment === 'all') {
        return servicesFromApi;
      }
      return servicesFromApi.filter(service => service.parentId === selectedDepartment);
    };

    const departmentServices = getDepartmentServices();

    return (
      <div className="fixed inset-0 z-50 overflow-hidden">
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setShowDepartmentSheet(false)}
        />

        <div
          className={`absolute bottom-0 left-0 right-0 ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          } rounded-t-2xl max-h-[90vh] overflow-y-auto animate-slide-up`}
        >
          <div
            className={`sticky top-0 ${
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            } border-b px-4 py-4 flex items-center gap-3`}
          >
            <button
              onClick={() => setShowDepartmentSheet(false)}
              className={`p-1.5 rounded-full ${
                darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}
            >
              <ChevronLeft
                size={20}
                className={darkMode ? 'text-gray-300' : 'text-gray-600'}
              />
            </button>

            <h2
              className={`text-lg font-bold ${
                darkMode ? 'text-gray-200' : 'text-gray-900'
              }`}
            >
              {getDepartmentTitle()}
            </h2>
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
              ({departmentServices.length} services)
            </span>
          </div>

          <div className="p-4">
            {loadingServices ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 size={32} className="animate-spin text-yellow-500" />
              </div>
            ) : departmentServices.length === 0 ? (
              <div className="text-center py-12">
                <div className={`text-lg font-medium ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  No services found
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {departmentServices.map((service) => {
                  const style = getServiceStyle(service);
                  const serviceName = service.name || service.serviceName;
                  const isNameVisible = service.isMainCategoryNameVisible !== false;
                  const isImageVisible = service.isMainCategoryImageVisible !== false;
                  
                  return (
                    <button
                      key={service._id || service.id}
                      onClick={() => handleServiceClick(service)}
                      className={`flex flex-col items-center justify-center ${
                        darkMode
                          ? 'bg-gray-700 hover:bg-gray-600'
                          : 'bg-gray-50 hover:bg-gray-100'
                      } rounded-xl p-3 transition-all active:scale-95`}
                    >
                      <div
                        className={`w-12 h-12 ${
                          darkMode ? style.darkBgColor : style.bgColor
                        } rounded-full flex items-center justify-center mb-2 overflow-hidden ${
                          !isImageVisible ? 'hidden' : ''
                        }`}
                      >
                        {renderServiceImage(service, style)}
                      </div>
                      {isNameVisible && (
                        <span
                          className={`text-xs font-medium ${
                            darkMode ? 'text-gray-300' : 'text-gray-700'
                          } text-center leading-tight`}
                        >
                          {serviceName}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  
  // const ServiceModal = () => {
  //   if (!showServiceModal) return null;

  //   // Find service from API data or use active service
  //   const serviceDetail = selectedCategoryData || activeService;
  //   if (!serviceDetail) return null;

  //   const style = getServiceStyle(serviceDetail);
  //   const serviceName = serviceDetail.name || serviceDetail.serviceName || selectedService;
  //   const serviceDetails = {
  //     name: serviceName,
  //     price: serviceDetail.serviceCharges || '₹599',
  //     rating: serviceDetail.rating || '4.5',
  //     duration: serviceDetail.serviceDuration || '45-60 mins',
  //     warranty: serviceDetail.warranty || '30 Days',
  //     description: serviceDetail.description || 'Professional repair service with expert technicians.',
  //     features: [
  //       'Expert technician visit',
  //       'Genuine parts (if needed)',
  //       `${serviceDetail.warranty || '30 Days'} service warranty`,
  //       'Free diagnosis',
  //       'Same day service available'
  //     ],
  //     popular: true,
  //     imageUri: serviceDetail.imageUri
  //   };

  //   return (
  //     <div className="fixed inset-0 z-50 overflow-hidden">
  //       <div 
  //         className="absolute inset-0 bg-black/50 backdrop-blur-sm"
  //         onClick={() => setShowServiceModal(false)}
  //       />
        
  //       <div className={`absolute bottom-0 left-0 right-0 ${
  //         darkMode ? 'bg-gray-800' : 'bg-white'
  //       } rounded-t-2xl max-h-[90vh] overflow-y-auto animate-slide-up`}>
  //         <div className={`sticky top-0 ${
  //           darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
  //         } border-b px-4 py-4 flex items-center justify-between`}>
  //           <div className="flex items-center gap-3">
  //             <button 
  //               onClick={() => setShowServiceModal(false)}
  //               className={`p-1.5 rounded-full ${
  //                 darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
  //               } transition-colors`}
  //             >
  //               <ChevronLeft size={20} className={darkMode ? 'text-gray-300' : 'text-gray-600'} />
  //             </button>
  //             <h2 className={`text-lg font-bold ${
  //               darkMode ? 'text-gray-200' : 'text-gray-900'
  //             }`}>
  //               {serviceDetails.name}
  //             </h2>
  //           </div>
  //         </div>

  //         <div className="p-4">
  //           <div className="flex items-center gap-4 mb-6">
  //             <div className={`w-16 h-16 ${
  //               darkMode ? style.darkBgColor : style.bgColor
  //             } rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden`}>
  //               {serviceDetails.imageUri ? (
  //                 <img 
  //                   src={serviceDetails.imageUri} 
  //                   alt={serviceDetails.name}
  //                   className="w-full h-full object-cover"
  //                   onError={(e) => {
  //                     e.currentTarget.style.display = 'none';
  //                     // Show fallback icon
  //                     const iconContainer = e.currentTarget.parentElement;
  //                     if (iconContainer) {
  //                       const icon = serviceIcons[serviceDetails.name];
  //                       if (icon) {
  //                         iconContainer.appendChild(icon);
  //                       } else {
  //                         iconContainer.innerHTML = '<div class="flex items-center justify-center w-full h-full"><Wrench size={28} class="text-blue-600" /></div>';
  //                       }
  //                     }
  //                   }}
  //                 />
  //               ) : (
  //                 serviceIcons[serviceDetails.name] || <Wrench size={28} className={style.iconColor} />
  //               )}
  //             </div>
  //             <div className="flex-1">
  //               <h3 className={`text-xl font-bold ${
  //                 darkMode ? 'text-gray-200' : 'text-gray-900'
  //               }`}>
  //                 {serviceDetails.name}
  //               </h3>
  //               <div className="flex items-center gap-2 mt-1">
  //                 <div className={`flex items-center gap-1 ${
  //                   darkMode 
  //                     ? 'bg-gray-700 text-yellow-300' 
  //                     : 'bg-gray-100 text-yellow-600'
  //                 } px-2 py-1 rounded`}>
  //                   <Star size={14} fill="currentColor" />
  //                   <span className="font-bold">{serviceDetails.rating}</span>
  //                 </div>
  //                 <span className={`text-sm ${
  //                   darkMode ? 'text-gray-400' : 'text-gray-600'
  //                 }`}>
  //                   {serviceDetails.warranty} Warranty
  //                 </span>
  //               </div>
  //             </div>
  //           </div>

  //           <div className="flex items-center justify-between mb-6">
  //             <div>
  //               <div className={`text-2xl font-bold ${
  //                 darkMode ? 'text-gray-200' : 'text-gray-900'
  //               }`}>
  //                 {serviceDetails.price}
  //               </div>
  //               <div className={`text-sm ${
  //                 darkMode ? 'text-gray-400' : 'text-gray-500'
  //               }`}>
  //                 starting price
  //               </div>
  //             </div>
              
  //             {quantities[serviceDetail._id] > 0 ? (
  //               <div className={`flex items-center rounded-lg overflow-hidden border ${
  //                 darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
  //               }`}>
  //                 <button 
  //                   onClick={() => updateQuantity(serviceDetail._id, -1)}
  //                   className={`w-10 h-10 flex items-center justify-center ${
  //                     darkMode 
  //                       ? 'text-gray-300 hover:bg-gray-600' 
  //                       : 'text-gray-600 hover:bg-gray-100'
  //                   }`}
  //                 >
  //                   <Minus size={16} />
  //                 </button>
  //                 <span className={`text-base font-bold w-8 text-center ${
  //                   darkMode ? 'text-gray-200' : 'text-gray-900'
  //                 }`}>
  //                   {quantities[serviceDetail._id]}
  //                 </span>
  //                 <button 
  //                   onClick={() => updateQuantity(serviceDetail._id, 1)}
  //                   className={`w-10 h-10 flex items-center justify-center ${
  //                     darkMode 
  //                       ? 'text-blue-400 hover:bg-gray-600' 
  //                       : 'text-blue-600 hover:bg-gray-100'
  //                   }`}
  //                 >
  //                   <Plus size={16} />
  //                 </button>
  //               </div>
  //             ) : (
  //               <button 
  //                 onClick={() => updateQuantity(serviceDetail._id, 1)}
  //                 className={`px-6 py-3 ${
  //                   darkMode 
  //                     ? 'bg-yellow-500 text-gray-900 hover:bg-yellow-600' 
  //                     : 'bg-yellow-400 text-gray-900 hover:bg-yellow-500'
  //                 } rounded-lg font-medium transition-colors`}
  //               >
  //                 Add
  //               </button>
  //             )}
  //           </div>

  //           <div className="grid grid-cols-2 gap-3 mb-6">
  //             <div className={`${
  //               darkMode ? 'bg-gray-700' : 'bg-gray-50'
  //             } rounded-xl p-3`}>
  //               <div className="flex items-center gap-2 mb-1">
  //                 <Clock size={18} className={darkMode ? 'text-gray-400' : 'text-gray-600'} />
  //                 <span className={`text-sm font-medium ${
  //                   darkMode ? 'text-gray-300' : 'text-gray-700'
  //                 }`}>
  //                   Duration
  //                 </span>
  //               </div>
  //               <div className={`font-bold ${
  //                 darkMode ? 'text-gray-200' : 'text-gray-900'
  //               }`}>
  //                 {serviceDetails.duration}
  //               </div>
  //             </div>
  //             <div className={`${
  //               darkMode ? 'bg-gray-700' : 'bg-gray-50'
  //             } rounded-xl p-3`}>
  //               <div className="flex items-center gap-2 mb-1">
  //                 <Shield size={18} className={darkMode ? 'text-green-400' : 'text-green-600'} />
  //                 <span className={`text-sm font-medium ${
  //                   darkMode ? 'text-gray-300' : 'text-gray-700'
  //                 }`}>
  //                   Warranty
  //                 </span>
  //               </div>
  //               <div className={`font-bold ${
  //                 darkMode ? 'text-gray-200' : 'text-gray-900'
  //               }`}>
  //                 {serviceDetails.warranty}
  //               </div>
  //             </div>
  //           </div>

  //           <div className="mb-6">
  //             <h3 className={`text-sm font-bold mb-2 ${
  //               darkMode ? 'text-gray-300' : 'text-gray-700'
  //             }`}>
  //               Service Description
  //             </h3>
  //             <p className={`${
  //               darkMode ? 'text-gray-400' : 'text-gray-600'
  //             } text-sm`}>
  //               {serviceDetails.description}
  //             </p>
  //           </div>

  //           <div className="mb-8">
  //             <h3 className={`text-sm font-bold mb-3 ${
  //               darkMode ? 'text-gray-300' : 'text-gray-700'
  //             }`}>
  //               What's Included
  //             </h3>
  //             <div className="space-y-2">
  //               {serviceDetails.features.map((feature: string, index: number) => (
  //                 <div key={index} className="flex items-start gap-3">
  //                   <div className={`w-5 h-5 ${
  //                     darkMode ? 'bg-green-500/20' : 'bg-green-100'
  //                   } rounded-full flex items-center justify-center flex-shrink-0 mt-0.5`}>
  //                     <Check size={12} className={darkMode ? 'text-green-400' : 'text-green-600'} />
  //                   </div>
  //                   <span className={`text-sm ${
  //                     darkMode ? 'text-gray-300' : 'text-gray-700'
  //                   }`}>
  //                     {feature}
  //                   </span>
  //                 </div>
  //               ))}
  //             </div>
  //           </div>

  //           <button className={`w-full ${
  //             darkMode 
  //               ? 'bg-yellow-500 text-gray-900 hover:bg-yellow-600' 
  //               : 'bg-yellow-400 text-gray-900 hover:bg-yellow-500'
  //           } font-bold py-4 rounded-xl transition-colors shadow-lg mb-4`}>
  //             Book Now for {serviceDetails.price}
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  // Bottom Navigation Component
  const BottomNav = () => {
    return (
      <nav className={`fixed bottom-0 left-0 right-0 py-3 shadow-lg z-50 ${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } border-t`}>
        <div className="flex justify-around items-center">
          <Link 
            href="/" 
            className={`flex flex-col items-center ${
              darkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-500 hover:text-blue-600'
            } transition-colors`}
          >
            <Home size={24} />
            <span className="text-xs mt-1 font-semibold">Home</span>
          </Link>
          
          <button className={`flex flex-col items-center ${
            darkMode ? 'text-yellow-400' : 'text-yellow-500'
          }`}>
            <Grid3x3 size={24} />
            <span className="text-xs mt-1 font-semibold">Services</span>
          </button>
          
          <Link 
            href="/payment" 
            className={`flex flex-col items-center relative ${
              darkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-500 hover:text-blue-600'
            } transition-colors`}
          >
            <ShoppingCart size={24} />
            {totalItems > 0 && (
              <span className={`absolute -top-1 -right-1 w-5 h-5 ${
                darkMode ? 'bg-yellow-500' : 'bg-yellow-400'
              } text-gray-900 text-xs rounded-full flex items-center justify-center font-bold`}>
                {totalItems}
              </span>
            )}
            <span className="text-xs mt-1 font-semibold">Cart</span>
          </Link>
          
          <Link 
            href="/my-bookings" 
            className={`flex flex-col items-center ${
              darkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-500 hover:text-blue-600'
            } transition-colors`}
          >
            <User size={24} />
            <span className="text-xs mt-1 font-semibold">Profile</span>
          </Link>
        </div>
      </nav>
    );
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'} pb-24 transition-colors duration-300`}>
      {/* Dark/Light Mode Toggle Button */}
      <button
        onClick={toggleDarkMode}
        className={`fixed top-4 right-4 z-50 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
          darkMode 
            ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-500' 
            : 'bg-gray-800 text-white hover:bg-gray-700'
        }`}
      >
        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      {/* Header */}
      <header className={`${darkMode ? 'bg-gray-800' : 'bg-white'} px-4 pt-6 pb-3 shadow-sm`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1">
            <h1 className={`text-xl font-bold ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
              Hi, User
            </h1>
            <div className={`flex items-center ${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm mt-0.5`}>
              <MapPin size={14} className="mr-1 flex-shrink-0" />
              {loadingLocation ? (
                <div className="flex items-center gap-1">
                  <Loader2 size={12} className="animate-spin" />
                  <span>Getting location...</span>
                </div>
              ) : (
                <span className="truncate">{location}</span>
              )}
            </div>
          </div>
          
          <div className="relative flex-1 mx-4 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className={`w-full pl-10 pr-4 py-2.5 ${
                darkMode 
                  ? 'bg-gray-700 text-gray-200 placeholder-gray-400' 
                  : 'bg-gray-100 text-gray-900 placeholder-gray-500'
              } border-0 rounded-lg text-sm focus:outline-none focus:ring-2 ${
                darkMode ? 'focus:ring-yellow-500' : 'focus:ring-yellow-400'
              }`}
            />
          </div>
          
          <button className={`w-10 h-10 rounded-full ${
            darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
          } flex items-center justify-center flex-shrink-0 transition-colors`}>
            <Bell size={20} className={darkMode ? 'text-gray-300' : 'text-gray-600'} />
          </button>
        </div>
      </header>

      {/* RIDER MODE Button */}
      <div className="px-4 mb-4 mt-2">
        <button className={`w-full ${
          darkMode ? 'bg-yellow-500 text-gray-900 hover:bg-yellow-600' : 'bg-yellow-400 text-gray-900 hover:bg-yellow-500'
        } rounded-lg py-3 flex items-center justify-center gap-2 font-bold text-lg shadow-sm transition-colors`}>
          <Bike size={20} />
          RIDER MODE
        </button>
      </div>

      {/* Service Tabs */}
      <div className="px-4 mb-4">
        <div className={`flex ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        } rounded-lg p-1 shadow-sm`}>
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab 
                  ? `${
                      darkMode 
                        ? 'bg-yellow-500 text-gray-900' 
                        : 'bg-yellow-400 text-gray-900'
                    } shadow-sm` 
                  : `${darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* LIMITED OFFER Card */}
      <div className="px-4 mb-6">
        <div className={`${
          darkMode 
            ? 'bg-gradient-to-r from-gray-800 to-gray-900 border-gray-700' 
            : 'bg-gradient-to-r from-gray-900 to-gray-800 border-gray-800'
        } rounded-2xl p-5 text-white shadow-lg border`}>
          <div className={`text-sm font-medium ${
            darkMode ? 'text-yellow-300' : 'text-yellow-300'
          } mb-1`}>
            LIMITED OFFER
          </div>
          <h2 className="text-xl font-bold mb-4">Get 20% off on your first AC Service</h2>
          <button className={`w-full ${
            darkMode 
              ? 'bg-yellow-500 text-gray-900 hover:bg-yellow-600' 
              : 'bg-yellow-400 text-gray-900 hover:bg-yellow-500'
          } font-bold py-3 rounded-xl transition-colors shadow-md`}>
            Book Now
          </button>
        </div>
      </div>

      {/* Department Section */}
      <section className={`${
        darkMode ? 'bg-gray-800' : 'bg-white'
      } mx-4 rounded-xl p-4 mb-6 shadow-sm`}>
        <div className="flex items-center justify-between mb-5">
          <h2 className={`text-lg font-bold ${
            darkMode ? 'text-gray-200' : 'text-gray-900'
          }`}>
            Department
          </h2>
          <button 
            onClick={() => {
              setSelectedDepartment('all');
              setShowDepartmentSheet(true);
            }}
            className={`${
              darkMode ? 'text-yellow-300 hover:text-yellow-200' : 'text-yellow-500 hover:text-yellow-600'
            } text-sm font-medium transition-colors`}
          >
            See all
          </button>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {departments.map((dept, index) => (
            <button
              key={index}
              onClick={() => handleDepartmentClick(dept.id)}
              className="flex flex-col items-center"
            >
              <div className={`w-14 h-14 ${
                darkMode ? dept.darkBgColor : dept.bgColor
              } rounded-full flex items-center justify-center mb-2 transition-colors`}>
                <span className={`text-lg font-semibold ${
                  darkMode ? 'text-gray-200' : 'text-gray-900'
                }`}>
                  {dept.icon}
                </span>
              </div>
              <span className={`text-xs font-medium ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              } text-center whitespace-pre-line leading-tight`}>
                {dept.name}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Select Service Section */}
      <section className={`${
        darkMode ? 'bg-gray-800' : 'bg-white'
      } mx-4 rounded-xl p-4 mb-24 shadow-sm`}>
        <div className="flex items-center justify-between mb-5">
          <h2 className={`text-lg font-bold ${
            darkMode ? 'text-gray-200' : 'text-gray-900'
          }`}>
            Select Service
          </h2>
          <button 
            onClick={() => {
              setSelectedDepartment('all');
              setShowDepartmentSheet(true);
            }}
            className={`${
              darkMode ? 'text-yellow-300 hover:text-yellow-200' : 'text-yellow-500 hover:text-yellow-600'
            } text-sm font-medium transition-colors`}
          >
            See all
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {loadingServices ? (
            Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className={`${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600' 
                    : 'bg-white border-gray-200'
                } rounded-xl p-4 flex flex-col items-center shadow-sm border w-full`}
              >
                <div className={`w-12 h-12 ${
                  darkMode ? 'bg-gray-600' : 'bg-gray-200'
                } rounded-full mb-3 animate-pulse`} />
                <div className={`h-4 w-16 ${
                  darkMode ? 'bg-gray-600' : 'bg-gray-200'
                } rounded animate-pulse`} />
              </div>
            ))
          ) : (
            getFilteredServices().map((service, index) => {
              const style = getServiceStyle(service);
              const serviceName = service.name || service.serviceName;
              const isNameVisible = service.isMainCategoryNameVisible !== false;
              const isImageVisible = service.isMainCategoryImageVisible !== false;
              
              console.log('Rendering service:', {
                serviceName,
                isNameVisible,
                isImageVisible
              });
              
              return (
                <button
                  key={service._id || service.id || index}
                  onClick={() => handleServiceClick(service)}
                  className={`${
                    darkMode 
                      ? 'bg-gray-700 hover:bg-gray-600 border-gray-600' 
                      : 'bg-white hover:bg-gray-50 border-gray-200'
                  } rounded-xl p-4 flex flex-col items-center shadow-sm hover:shadow-md active:scale-95 transition-all border w-full ${
                    !isNameVisible && !isImageVisible ? 'hidden' : ''
                  }`}
                >
                  {isImageVisible && (
                    <div className={`w-12 h-12 ${
                      darkMode ? style.darkBgColor : style.bgColor
                    } rounded-full flex items-center justify-center mb-3 transition-colors overflow-hidden`}>
                      {renderServiceImage(service, style)}
                    </div>
                  )}
                  {isNameVisible && (
                    <span className={`text-sm font-medium ${
                      darkMode ? 'text-gray-200' : 'text-gray-900'
                    } text-center leading-tight`}>
                      {serviceName}
                    </span>
                  )}
                </button>
              );
            })
          )}
        </div>
      </section>

      {/* Floating Cart */}
      {totalItems > 0 && (
        <Link href="/payment">
          <div className="fixed bottom-20 left-4 right-4 z-40">
            <div className={`${
              darkMode ? 'bg-gray-900 border-gray-700' : 'bg-gray-900 border-gray-800'
            } rounded-2xl p-3 text-white shadow-lg border`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    <div className={`w-8 h-8 ${
                      darkMode ? 'bg-yellow-500' : 'bg-yellow-400'
                    } rounded-full flex items-center justify-center z-10`}>
                      <span className="text-xs font-bold text-gray-900">1</span>
                    </div>
                    <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold">+{totalItems - 1}</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-sm font-bold">{totalItems} Items added</span>
                    <p className="text-xs text-gray-300">₹399 total</p>
                  </div>
                </div>
                <button className={`flex items-center gap-1 ${
                  darkMode 
                    ? 'bg-gray-700 text-white hover:bg-gray-600' 
                    : 'bg-gray-800 text-white hover:bg-gray-700'
                } px-3 py-1.5 rounded-lg text-sm font-bold transition-colors`}>
                  View Cart
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </Link>
      )}

      {/* Bottom Navigation */}
      <BottomNav />

      {/* Department Bottom Sheet */}
      <DepartmentSheet />

      {/* Service Category Popup */}
      <ServiceCategoryPopup />

      {/* Child Category Popup (Services, Repair, Installation) */}
      <ChildCategoryPopup />

      {/* Service Modal */}
      {/* <ServiceModal /> */}
    </div>
  );
}


