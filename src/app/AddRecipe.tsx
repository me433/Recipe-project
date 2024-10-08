import { useEffect, useState, Dispatch, SetStateAction } from 'react';
import axios from 'axios';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps, SelectProps } from 'antd';
import { message, Upload } from 'antd';
import { PageTitle } from '../ui/PageTitle';
import { Text } from '../ui/Text';
import {
  Button,
  Form,
  Input,
  Select
} from 'antd';




const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};


let ingredients: SelectProps['options'] = [];
let labels: SelectProps['options'] = [];

async function fetchResource(resource: string): Promise<{data: string[]}> {
  const response = await fetch(`http://localhost:3500/api/${resource}`);
  const data = await response.json();
  return data;
}

const handleChange = (value: string[]) => {
  console.log(`selected ${value}`);
};

const { Dragger } = Upload;

const props: UploadProps = {
  name: 'file',
  multiple: true,
  action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

interface Recipe {
  id: number;
  title: string;
  description: string;
  ingredients: string[];
  labels: string[];
  pdf: string;
}

interface AddRecipeProps {
  setRecipeList: Dispatch<SetStateAction<Recipe[]>>;
  recipeList: Recipe[];
}

const AddRecipe: React.FC<AddRecipeProps> = ( {setRecipeList, recipeList}: AddRecipeProps ) => {
  const [addRecipe] = Form.useForm();
  const [initLoading, setInitLoading] = useState<boolean>(true)

  useEffect(() => {
    Promise.all([
      fetchResource('ingredients'),
      fetchResource('labels'),
    ]).then(([resIngredients, resLabels]) => {
      console.log('loaded')
      setInitLoading(false)
      ingredients = (resIngredients['data'].map(value => ({label: value, value,})))
      labels = (resLabels['data'].map(value => ({label: value, value,})))
    }).catch((err) => {
      console.log(err)
    })
  }, [])

  const submitRecipe = (values: any) => {
    const id : number = recipeList.length ? recipeList[recipeList.length-1].id + 1 : 1;
    const recipe = {id: id, title: values.recipeName, description: values.recipeDescription, ingredients: values.recipeIngredients, labels: values.recipeLabels, pdf: values.recipePdf}
    const allRecipes: Recipe[] = [...recipeList, recipe];
    axios.post(`http://localhost:3500/api/recipes`, recipe)
    setRecipeList(allRecipes)
    addRecipe.resetFields();
  };

  return (
    <>
        <PageTitle text="Recept toevoegen" style={{marginBottom: '16px'}}/>
        <Text text="Voeg je recept hieronder toe:" color="" size=""/>
        <Form form={addRecipe} {...formItemLayout} variant="outlined" style={{ maxWidth: 600 }} onFinish={submitRecipe}>
          <Form.Item label="Naam recept" name="recipeName" rules={[{ required: true, message: 'Kies naam!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Beschrijving recept" name="recipeDescription" rules={[{ required: true, message: 'Kies beschrijving!' }]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="Upload pdf"
            name="recipePdf"
            rules={[{ required: false, message: 'Upload recept!' }]}
          >
            <Dragger {...props}>
              <p className="ant-upload-drag-icon">
                  <InboxOutlined />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
              <p className="ant-upload-hint">
                  Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                  banned files.
              </p>
            </Dragger>
          </Form.Item>

          <Form.Item
            label="Ingrediënten"
            name="recipeIngredients"
            rules={[{ required: true, message: 'Selecteer ingredienten!' }]}
          >
                <Select
                  mode="multiple"
                  placeholder="Selecteer ingrediënten"
                  onChange={handleChange}
                  options={ingredients}
                  loading={initLoading}
                />
          </Form.Item>

          <Form.Item
            label="Labels"
            name="recipeLabels"
          >
                <Select
                  mode="multiple"
                  placeholder="Selecteer labels"
                  onChange={handleChange}
                  options={labels}
                  loading={initLoading}
                />
          </Form.Item>


          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>


    </>
    );
    
};

export default AddRecipe;