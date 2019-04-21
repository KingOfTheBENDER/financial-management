import React, { Component } from 'react'
import DatePicker from 'react-native-datepicker'
import {connect} from 'react-redux';
import {operationUpdate} from "../actions/OperationAction";

class MyDatePicker extends Component {
    constructor(props){
        super(props)
        this.state = {
            dateTime: '',
        }
    }

    render(){
        return (
            <DatePicker
                dateValid="false"
                date={this.state.dateTime}
                value={this.state.dateTime}
                mode="date"
                placeholder="Выбери дату"
                format="YYYY-MM-DD"
                confirmBtnText="Принять"
                cancelBtnText="Отменить"
                customStyles={{
                    dateIcon: {
                        display: 'none',
                    },
                    dateInput: {
                        height: 45,
                        borderWidth: 1,
                        borderRadius: 7,
                    },


                }}
                onDateChange={(value,date) => {
                    this.setState({dateTime:date});
                    this.props.operationUpdate({prop:'dateTime',value});
                }}
            />
        )
    }
}

const mapStateToProps=state=>{
    return {dateTime:state.operationForm.dateTime};
};

export default connect(mapStateToProps,{operationUpdate})(MyDatePicker);