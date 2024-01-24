import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { useState } from 'react';
import FriendRequestCard from './components/FriendRequestCard';
import AlreadyFriendCard from './components/AlreadyFriendCard';
const Friends = () => {
    const [acitveTab, setActiveTab] = useState(1);
    return (
        <section className="mt-10">
            <Tabs variant='enclosed' acitveTab={acitveTab} onChange={(index) => setActiveTab(index)}>
                <TabList>
                    <Tab>All Friends</Tab>
                    <Tab>Friend Requests</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                            <AlreadyFriendCard />
                            <AlreadyFriendCard />
                            <AlreadyFriendCard />
                            <AlreadyFriendCard />
                            <AlreadyFriendCard />
                            <AlreadyFriendCard />
                            <AlreadyFriendCard />
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                            <FriendRequestCard />
                            <FriendRequestCard />
                            <FriendRequestCard />
                            <FriendRequestCard />
                            <FriendRequestCard />
                            <FriendRequestCard />
                            <FriendRequestCard />
                        </div>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </section>
    );
};

export default Friends;