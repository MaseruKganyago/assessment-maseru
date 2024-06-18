import { useEmployees } from '@/providers';
import { Input } from 'antd';
import { FC, useEffect, useState } from 'react';
import _ from 'lodash';

interface ISearchProps {}

const { Search } = Input;

export const SearchInput: FC<ISearchProps> = ({}) => {
  const { getAllEmployees, filterSettings, storeFilterSettings } = useEmployees();
  const [searchText, setSearchText] = useState<string>('');

  useEffect(() => {
    if (!_.isEmpty(filterSettings?.searchString)) {
      setSearchText(filterSettings?.searchString);
    }
  }, [filterSettings]);

  const handleSearch = (searchString: string) => {
    getAllEmployees({ searchString });

    storeFilterSettings({ ...filterSettings, searchString });
  };

  return (
    <Search
      placeholder="Search"
      allowClear
      value={searchText}
      onSearch={handleSearch}
      onChange={(e) => setSearchText(e.target.value)}
      style={{ width: 500 }}
    />
  );
};

export default SearchInput;
