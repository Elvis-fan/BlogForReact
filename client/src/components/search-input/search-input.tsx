import * as React from 'react'
import { Select } from 'antd'
import './search-input.less'

const Option = Select.Option

let timeout: any
let currentValue: any

function fetch1(value: any, callback: any) {
    if (timeout) {
        clearTimeout(timeout)
        timeout = null
    }
    currentValue = value

    function fake() {

        const data: any[] = []
        for (let i: number = 0; i < 10; i++) {
            data.push({
                value: i,
                text: i,
            })
        }
        callback(data)
    }

    timeout = setTimeout(fake, 300)
}
interface SearchInputProps {
    placeholder: string;
    style: any;
    className: string;
}
class SearchInput extends React.Component<SearchInputProps, any> {
    public props = {
        placeholder: 'Search',
        className: '',
        style: {}

    }
    public state = {
        data: [],
        value: '',
    }
    constructor(props:SearchInputProps){
        super(props)
    }
    handleChange = (value: any) => {
        this.setState({ value })
        fetch1(value, (data: any) => this.setState({ data }))
    }
    public render() {
        const options = this.state.data.map((d: any) => <Option key={d.value}>{d.text}</Option>)
        return (
            <Select
                
                className='search-input'
                value={this.state.value}
                placeholder={this.props.placeholder}
                notFoundContent=''
                style={this.props.style}
                dropdownClassName={this.props.className || ''}
                defaultActiveFirstOption={false}
                onChange={this.handleChange}
            >
                {options}
            </Select>
        )
    }
}
export default SearchInput