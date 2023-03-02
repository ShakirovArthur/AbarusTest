// @ts-ignore
import React, { useCallback, useMemo, useState,useEffect } from 'react';
import { Input, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import './table.css';
import './searchInput.css';
import {fetchDataList} from "../store/slice";
import {useDispatch,useSelector} from "react-redux";



interface DataType {
	key: React.Key;
	id: number;
	title: string;
	body: string;
}
const { Search } = Input;
const columns: ColumnsType<DataType> = [
	{
		title: 'ID',
		dataIndex: 'id',
		sorter: (a, b) => a.id - b.id,
		sortDirections: ['descend'],
		key:1,
	},
	{
		title: 'Заголовок',
		dataIndex: 'title',
		sorter: (a, b) => a.title.localeCompare(b.title),
		key:2
	},
	{
		title: 'Описание',
		dataIndex: 'body',
		sorter: (a,b) => a.body.localeCompare((b.body)),
		key:3
	},
];



const TableInfo: React.FC = () => {
	const data = useSelector(({dataList}) => dataList);
	const [searchText,setSearchText] = useState('');

	const handleSearch = useCallback((value) => {
		setSearchText((value))
	},[searchText])

	const filteredData = useMemo(() => {
		return data.filter((record) => {
			const values = Object.values(record).join(' ').toLowerCase();
			return values.includes(searchText.toLowerCase());
		})
	},[data,searchText]);

	const dispatch = useDispatch();

	useEffect(() => {
		// @ts-ignore
		dispatch(fetchDataList());
	},[dispatch])

	function updateUrl(pageNumber:number) {
		const newUrl = `${window.location.pathname}?page=${pageNumber}`;
		window.history.pushState({path:newUrl}, '',newUrl)
	}


	return (
		<div className='table-data-info'>
			<Space direction="vertical" className='search'>
				<Search className='searchInput' onSearch={handleSearch} placeholder="Поиск" enterButton />
			</Space>
		<Table columns={columns} dataSource={filteredData} pagination={{onChange:(pageNumber) => {updateUrl(pageNumber)}}}   className='table-info'/>
		</div>
	)
};

export default TableInfo;