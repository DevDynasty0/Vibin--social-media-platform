import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import React from 'react';
import Videos from './mediacontent/Videos';
import Images from './mediacontent/Images';

const Media = ({ reversedPosts }) => {
  return (
    <div className='mt-8 border '>

<Tabs>
 
  <TabList className='bg-gray-100'>
    <Tab className=''>Images</Tab>
    <Tab>Videos</Tab>
    
  </TabList>
  

  <TabPanels>
    <TabPanel>
     <Images reversedPosts={reversedPosts}></Images>
    </TabPanel>

    <TabPanel>
   <Videos reversedPosts={reversedPosts}></Videos>
    </TabPanel>

    
  </TabPanels>
</Tabs>



     
    </div>
  );
};

export default Media;
