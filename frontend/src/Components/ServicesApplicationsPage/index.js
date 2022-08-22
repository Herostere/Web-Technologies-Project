import React, { useState } from 'react'
import './ServicesApplicationsPage.css'
const ServicesApplicationsPage = () => {
const [toggleTabs, setToggleTabs] = useState(1)
const toggleTab = (index) => {
    setToggleTabs(index)
}
const selectcleo = () => {
    window.location.href = '/ServicesApplications/cleo/'
}
const selectcles = () => {
    window.location.href = '/ServicesApplications/cles/'
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
                <div class='imagefield'>     
                </div> 
                <div className='feature'>  
                    3D Bone Minerai Density BMD analysis   
                </div>   
                <div className='feature'>  
                    3D Tracecular Bone analysis
                </div>
                <button class='cleobutton' type='button' onClick={selectcleo}>
                    Select
                </button>    
            </div>
            <div className='rightbloc'>
                <div className='basicfield'>  
                    Basic   
                </div>     
                <div className='titlefield'>  
                    CLES FOR SCOLIOSIS 
                </div>
                <div class='imagefield2'>     
                </div>       
                <div className='feature'>  
                    Vertebra detection   
                </div>   
                <div className='feature'>  
                    Vertebra mobility analysis   
                </div>
                <button class='clesbutton' type='button' onClick={selectcles}>
                    Select
                </button>              
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
                <div class='imagefield'>     
                </div> 
                <div className='feature'>  
                    3D Bone Minerai Density BMD analysis   
                </div>   
                <div className='feature'>  
                    3D Tracecular Bone analysis
                </div>
                <div className='feature'>  
                    3D Cortical analysis
                </div>
                <button class='cleobutton' type='button' onClick={selectcleo}>
                    Select
                </button>        
            </div>
            <div className='rightbloc'>
                <div className='advancedfield'>  
                    Advanced   
                </div>     
                <div className='titlefield'>  
                    CLES FOR SCOLIOSIS  
                </div>
                <div class='imagefield2'>     
                </div>     
                <div className='feature'>  
                    Vertebra detection & Mobility  
                </div>   
                <div className='feature'>  
                    Vertebra mobility analysis & Mobility  
                </div>
                <div className='feature'>  
                    Web-parametrized and precise detection
                </div>
                <button class='clesbutton' type='button' onClick={selectcles}>
                    Select
                </button>                 
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
                </div>
                <div className='feature'>  
                    3D-based Trabecular analysis 
                </div>   
                <div className='feature'>  
                    3D-based Cortical analysis
                </div>   
                <div className='feature'>  
                    3D-based Anisotropy computation
                </div>   
                <div className='feature'>  
                    3D visulization and reconstruction
                </div>   
                <div className='feature'>  
                    Progression report
                </div>
                <button class='cleobutton' type='button' onClick={selectcleo}>
                    Select
                </button>       
            </div>
            <div className='rightbloc'>
                <div className='personalizedfield'>  
                    Personalized   
                </div>     
                <div className='titlefield'>  
                    CLES FOR SCOLIOSIS 
                </div>
                <div class='imagefield2'>     
                </div>      
                <div className='feature'>  
                    Vertebra detection & Mobility 
                </div>   
                <div className='feature'>  
                    Spine curve detection & Mobility
                </div>
                <div className='feature'>  
                    Vertebra segmentation & Mobility
                </div>    
                <div className='feature'>  
                    Results analysis & interpretation
                </div>    
                <div className='feature'>  
                    3D analysis & visualization
                </div>
                <button class='clesbutton' type='button' onClick={selectcles}>
                    Select
                </button>   
                                 
            </div>            
        </div>
    </div>
  );
};

export default ServicesApplicationsPage;