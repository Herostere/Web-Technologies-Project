import React, { useState } from 'react'
import './ServicesApplicationsPage.css'
const ServicesApplicationsPage = () => {
const [toggleTabs, setToggleTabs] = useState(1)
const toggleTab = (index) => {
    setToggleTabs(index)
}
  return (
    <div className='page'>
        <div className='tab-container'>
            <div className={toggleTabs === 1 ? 'tab active-tab' : 'tab'} onClick={()=>toggleTab(1)}>
                Basic
            </div>
            <div className={toggleTabs === 2 ? 'tab active-tab' : 'tab'} onClick={()=>toggleTab(2)}>
                Advanced
            </div>
            <div className={toggleTabs === 3 ? 'tab active-tab' : 'tab'} onClick={()=>toggleTab(3)}>
                Personalized
            </div>
        </div>
        <div className={toggleTabs === 1 ? 'container active-container' : 'container'}>
            <div className='leftbloc'>
                <div className='basicfield'>  
                    Basic   
                </div>
                <div className='titlefield'>  
                    CLEO FOR OSTEOPOROSIS
                </div>
                <div className='imagefield'>  
                    Basic   
                </div>
                <div className='feature'>  
                    3D Bone Minerai Density BMD analysis   
                </div>   
                <div className='feature'>  
                    3D Tracecular Bone analysis
                </div>   
            </div>
            <div className='rightbloc'>
                <div className='basicfield'>  
                    Basic   
                </div>     
                <div className='titlefield'>  
                    CLEO FOR SCOLIOSIS 
                </div>
                <div className='imagefield'>  
                    Basic   
                </div>      
                <div className='feature'>  
                    Vertebra detection   
                </div>   
                <div className='feature'>  
                    Vertebra mobility analysis   
                </div>             
            </div>
            
        </div>

        <div className={toggleTabs === 2 ? 'container active-container' : 'container'}>
            <div className='leftbloc'>
                <div className='advancedfield'>  
                    Advanced   
                </div>
                <div className='titlefield'>  
                    CLEO FOR OSTEOPOROSIS
                </div>
                <div className='imagefield'>  
                    Basic   
                </div>
                <div className='feature'>  
                    3D Bone Minerai Density BMD analysis   
                </div>   
                <div className='feature'>  
                    3D Tracecular Bone analysis
                </div>   
            </div>
            <div className='rightbloc'>
                <div className='advancedfield'>  
                    Advanced   
                </div>     
                <div className='titlefield'>  
                    CLEO FOR SCOLIOSIS 
                </div>
                <div className='imagefield'>  
                    Basic   
                </div>      
                <div className='feature'>  
                    Vertebra detection   
                </div>   
                <div className='feature'>  
                    Vertebra mobility analysis   
                </div>             
            </div>            
        </div>

        <div className={toggleTabs === 3 ? 'container active-container' : 'container'}>
            <div className='leftbloc'>
                <div className='personalizedfield'>  
                    Personalized   
                </div>
                <div className='titlefield'>  
                    CLEO FOR OSTEOPOROSIS
                </div>
                <div className='imagefield'>  
                    Basic   
                </div>
                <div className='feature'>  
                    3D Bone Minerai Density BMD analysis   
                </div>   
                <div className='feature'>  
                    3D Tracecular Bone analysis
                </div>   
            </div>
            <div className='rightbloc'>
                <div className='personalizedfield'>  
                    Personalized   
                </div>     
                <div className='titlefield'>  
                    CLEO FOR SCOLIOSIS 
                </div>
                <div className='imagefield'>  
                    Basic   
                </div>      
                <div className='feature'>  
                    Vertebra detection   
                </div>   
                <div className='feature'>  
                    Vertebra mobility analysis   
                </div>             
            </div>            
        </div>
    </div>
  );
};

export default ServicesApplicationsPage;