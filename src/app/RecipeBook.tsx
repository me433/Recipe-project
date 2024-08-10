import { useEffect, useState, Dispatch, SetStateAction } from 'react';
import VirtualList from 'rc-virtual-list';
import { PageTitle } from '../ui/PageTitle';
import { List } from 'antd';
import type { SelectProps } from 'antd';
import { Select } from 'antd';
import { Input } from 'antd';


const ContainerHeight = window.innerHeight - 64 - 32 - 64.5 - 33;
{/* 32 because two times the padding set in Navigation : Need better solution*/}

let ingredients: SelectProps['options'] = [];
let labels: SelectProps['options'] = [];

async function fetchResource(resource: string): Promise<{data: string[]}> {
  const response = await fetch(`http://localhost:3500/api/${resource}`);
  const data = await response.json();
  return data;
}

async function fetchRecipes(): Promise<Recipe[]> {
  const response = await fetch(`http://localhost:3500/api/recipes`);
  const data = await response.json();
  return data;
}

interface Recipe {
  id: number;
  title: string;
  description: string;
  ingredients: string[];
  labels: string[];
  pdf: string;
}

interface RecipeBookProps {
  setRecipeList: Dispatch<SetStateAction<Recipe[]>>;
  recipeList: Recipe[];
}

const RecipeBook: React.FC<RecipeBookProps> = ({ setRecipeList, recipeList }: RecipeBookProps) => {
  const [search, setSearch] = useState<string>('')
  const [searchResults, setSearchResults] = useState<Recipe[]>([])
  const [ingredientFilter, setIngredientFilter] = useState<string[]>([])
  const [labelFilter, setLabelFilter] = useState<string[]>([])
  const [initLoading, setInitLoading] = useState<boolean>(true)
  const { Search } = Input;

  useEffect(() => {
    Promise.all([
      fetchResource('ingredients'),
      fetchResource('labels'),
      fetchRecipes()
    ]).then(([resIngredients, resLabels, resRecipes]) => {
      setInitLoading(false);
      ingredients = (resIngredients['data'].map(value => ({label: value, value,})))
      labels = (resLabels['data'].map(value => ({label: value, value,})))
      setRecipeList(resRecipes);
    }).catch((err) => {
      console.log(err)
    })
  }, [])

  useEffect(() => {
    const filteredRecipes: Recipe[] = recipeList.filter(recipe => (((recipe.title).toLowerCase()).includes(search.toLowerCase())
    || ((recipe.description).toLowerCase()).includes(search.toLowerCase()))
    && ingredientFilter?.every((i: any) => recipe.ingredients?.includes(i))
    && labelFilter?.every((i: any) => recipe.labels?.includes(i))
  );
    setSearchResults(filteredRecipes);
  }, [search, ingredientFilter, labelFilter, initLoading])

  const handleLabelChange = (value: string[]) => {
    setLabelFilter(value);
  };

  const handleIngredientChange = (value: string[]) => {
    setIngredientFilter(value);
  };

  return (
    <>
    <PageTitle 
      text="Receptenboek" 
      style={{marginBottom: '16px'}}
    />
    <Search placeholder="input search text" value={search} onChange={(e) => setSearch(e.target.value)} style={{ width: '23%', marginRight: '2%'}} />
    <Select
      mode="multiple"
      style={{ width: '23%', marginRight: '2%' }}
      placeholder="Selecteer ingrediënten"
      loading={initLoading}
      onChange={handleIngredientChange}
      options={ingredients}
    />
    <Select
      mode="multiple"
      style={{ width: '23%', marginRight: '2%' }}
      placeholder="Selecteer labels"
      loading={initLoading}
      onChange={handleLabelChange}
      options={labels}
    />
    <List>
      <VirtualList
        data={searchResults}
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