import * as React from 'react';
import { Select } from 'antd';

const Option = Select.Option;

let timeout;
let currentValue;

function fetch1(value, callback) {
	if (timeout) {
		clearTimeout(timeout);
		timeout = null;
	}
	currentValue = value;

	function fake() {
		const data = [];
		for (let i = 0; i < 10; i++) {
			data.push({
				value: i,
				text: i
			});
		}
		callback(data);
	}

	timeout = setTimeout(fake, 300);
}

class SearchInput extends React.Component {
	constructor(props) {
		super(props);
	}
	state = {
		data: [],
		value: ''
	};
	handleChange = (value) => {
		this.setState({ value });
		fetch1(value, (data) => this.setState({ data }));
	};
	render() {
		const options = this.state.data.map((d) => <Option key={d.value}>{d.text}</Option>);
		return (
			<Select
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
