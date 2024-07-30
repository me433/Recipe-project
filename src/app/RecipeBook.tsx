import { List } from 'antd';
import VirtualList from 'rc-virtual-list';
import { PageTitle } from '../ui/PageTitle';
import type { SelectProps } from 'antd';
import { Select } from 'antd';
import { Input } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';

interface Recipe {
  id: number;
  title: string;
  description: string;
  ingredients: string[];
  labels: string[];
  pdf: string;
}

const ContainerHeight = window.innerHeight - 64 - 32 - 64.5 - 33;
{/* 32 because two times the padding set in Navigation : Need better solution*/}

//Property 'recipeList' does not exist on type 'Recipe[]'.ts(2339)
//(parameter) recipeList: any
interface RecipeBookProps {
  recipeList: Recipe[];
}

const RecipeBook: React.FC<RecipeBookProps> = ({ recipeList }: RecipeBookProps) => {

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
        data={recipeList}
        height={ContainerHeight}
        itemHeight={47}
        itemKey="id"
      >
        {(item: Recipe) => (
          <List.Item key={item.id}>
            <List.Item.Meta
              title={item.title}
              description={item.description}
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