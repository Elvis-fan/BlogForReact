import * as React from 'react';
import { Select } from 'antd';

const Option = Select.Option;

let timeout: any;
let currentValue: any;

function fetch1(value: any, callback: Function) {
    if (timeout) {
        clearTimeout(timeout);
        timeout = null;
    }
    currentValue = value;

    function fake() {

        const data: any[] = [];
        for (let i: number = 0; i < 10; i++) {
            data.push({
                value: i,
                text: i,
            });
        }
        callback(data);
    }

    timeout = setTimeout(fake, 300);
}
interface SearchInputProps {
    placeholder: string;
    style: any;
    className: string;
}
class SearchInput extends React.Component<SearchInputProps, any> {
    props = {
            placeholder: 'Search',
            className: '',
            style: {}

    }
    state = {
        data: [],
        value: '',
    };
    handleChange = (value: any) => {
        this.setState({ value });
        fetch1(value, (data: any) => this.setState({ data }));
    }
    render() {
        const options = this.state.data.map((d: any) => <Option key={d.value}>{d.text}</Option>);
        return (
            <Select
                mode="combobox"
                value={this.state.value}
                placeholder={this.props.placeholder}
                notFoundContent=""
                style={this.props.style}
                dropdownClassName={this.props.className || ''}
                defaultActiveFirstOption={false}
                onChange={this.handleChange}
            >
                {options}
            </Select>
        );
    }
}
export default SearchInput;