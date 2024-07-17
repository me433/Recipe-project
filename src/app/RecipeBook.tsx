import React, { useEffect, useState } from 'react';
import { Avatar, List } from 'antd';
import VirtualList from 'rc-virtual-list';
import { PageTitle } from '../ui/PageTitle';
import type { SelectProps } from 'antd';
import { Select } from 'antd';
import { Input } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';

interface UserItem {
  email: string;
  gender: string;
  name: {
    first: string;
    last: string;
    title: string;
  };
  nat: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
}

const fakeDataUrl =
  'https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo';
const ContainerHeight = window.innerHeight - 64 - 32 - 64.5 - 33;
{/* 32 because two times the padding set in Navigation : Need better solution*/}

const RecipeBook: React.FC = () => {
  const [data, setData] = useState<UserItem[]>([]);

  const appendData = () => {
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((body) => {
        setData(data.concat(body.results));
      });
  };

  useEffect(() => {
    appendData();
  }, []);

  const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
    // Refer to: https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#problems_and_solutions
    if (Math.abs(e.currentTarget.scrollHeight - e.currentTarget.scrollTop - ContainerHeight) <= 1) {
      appendData();
    }
  };

const { Search } = Input;

const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

const options: SelectProps['options'] = [];

for (let i = 0; i < 100000; i++) {
  const value = `${i.toString(36)}${i}`;
  options.push({
    label: value,
    value,
    disabled: i === 10,
  });
}

const handleChange = (value: string[]) => {
  console.log(`selected ${value}`);
};


  return (
    <>
    <PageTitle 
      text="Receptenboek" 
      style={{marginBottom: '16px'}}
    />
    <Search placeholder="input search text" onSearch={onSearch} style={{ width: '23%', marginRight: '2%'}} />
    <Select
      mode="multiple"
      style={{ width: '23%', marginRight: '2%' }}
      placeholder="Selecteer ingrediënten"
      onChange={handleChange}
      options={options}
    />
    <Select
      mode="multiple"
      style={{ width: '23%', marginRight: '2%' }}
      placeholder="Selecteer labels"
      onChange={handleChange}
      options={options}
    />
    <List>
      <VirtualList
        data={data}
        height={ContainerHeight}
        itemHeight={47}
        itemKey="email"
        onScroll={onScroll}
      >
        {(item: UserItem) => (
          <List.Item key={item.email}>
            <List.Item.Meta
              avatar={<Avatar src={item.picture.large} />}
              title={<a href="https://ant.design">{item.name.last}</a>}
              description={item.email}
            />
            <div>Content</div>
          </List.Item>
        )}
      </VirtualList>
    </List>
    </>
  );
};

export default RecipeBook;