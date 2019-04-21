import _ from 'lodash';
import React, { Component } from 'react';
import { ListView} from 'react-native';
import { Button, ListItem } from 'react-native-elements';
import {operationFetch} from '../actions/OperationAction';
import {connect} from 'react-redux';

class OperationScreen extends Component{

    static navigationOptions=({navigation})=>{
        return {
            title: 'Операции',
            headerRight: (
                <Button
                    title='Добавить'
                    onPress={() => navigation.navigate('add')}
                    type="clear"
                />),

        };
    }

    componentWillMount(){
        this.props.operationFetch();
        this.createDataSource(this.props);
    }

    componentWillReceiveProps(nextProps){
        this.createDataSource(nextProps);
    }

    createDataSource({operations}){
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.dataSource = ds.cloneWithRows(operations);
    }

    renderRow(operations){
        return(
            <ListItem
                title={"Дата: "+operations.dateTime+' Прибыль: ' +operations.profit}
                subtitle= {"Приход денег: "+operations.amountIncome+" Расход денег: "+operations.amountOutcome}
            />
        );
    }


    render(){
        return(
                <ListView
                    enableEmptySections
                    dataSource={this.dataSource}
                    renderRow={this.renderRow}
                />
        );
    }
}

const mapStateToProps=state=>{
    const operations=_.map(state.operations,(val)=>{
        return {...val};
    });

    return {operations};
};


export default connect(mapStateToProps,{operationFetch})(OperationScreen);