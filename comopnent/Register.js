import React, {Component} from 'react';
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Text,
  Card,
} from 'native-base';
import {StyleSheet,Alert, ActivityIndicator} from 'react-native';
import * as yup from 'yup';
import {Formik} from 'formik';
import DatePicker from 'react-native-datepicker'
import {TextInput} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {compose} from "recompose";
import makeInput, {KeyboardModal, withPickerValues} from 'react-native-formik';

const MyPicker = compose(makeInput,withPickerValues)(TextInput);

export class RegisterForm extends Component {
  constructor() {
    super();
    this.state = {
      Name: '',
      emailAddress: '',
      birthDate: '',
      gender: '',
      password: '',
    };
  }
  render() {
    const sleep = ms => new Promise(r => setTimeout(r, ms));
    return (
      <Formik
        initialValues={{
          Name: '',
          emailAddress: '',
          password: '',
        }}
        onSubmit={async ( values ) => {
          try {
            await sleep(500);
            KeyboardModal.dismiss();
            console.log(values);
            const user_details = JSON.stringify(values);
            await AsyncStorage.setItem(values.emailAddress || 'userData', user_details)
              .then( Alert.alert(user_details))
              .then(() => {
                console.warn(user_details);
                console.warn("set user", AsyncStorage.getAllKeys());  
                this.props.navigation.navigate('LogInScreen') 
              });} catch (e) {
}
        }}
        validationSchema={yup.object().shape({
          Name: yup.string().required('Please, provide your Name!'),
          emailAddress: yup
            .string()
            .email()
            .required(`Coudn't find your Email Account`),
          password: yup
            .string()
            .min(8)
            .max(10, 'Password should not excced 10 chars.')
            .required(),
        })}>
        {(formikProps) =>(
          <React.Fragment>
            <Container style={styles.container_bg}>
              <Content>
                <Card style={styles.card}>
                  <Form style={styles.form}>
                    <Item>
                      <Label> Name</Label>
                      <Input
                        onBlur={() => formikProps.setFieldTouched('Name')} 
                        autoCorrect={false}
                        keyboardType="email-address"
                        returnKeyType="next"
                        onChangeText={formikProps.handleChange('Name')} />   
                    </Item>
                    <Text style={styles.text_err}>
                      {formikProps.touched.Name && formikProps.errors.Name && (
                        <Text style={styles.text_error}>
                          {formikProps.errors.Name}
                        </Text>
                      )}
                    </Text>
                    <Item fixed>
                      <Label>Email</Label>
                      <Input
                        onBlur={() => formikProps.setFieldTouched('emailAddress')} 
                        autoCapitalize="none"
                        onChangeText={formikProps.handleChange('emailAddress')}
                      />
                    </Item>
                    <Text style={styles.text_err}>
                      {formikProps.touched.emailAddress &&
                        formikProps.errors.emailAddress && (
                          <Text style={styles.text_error}>
                            {formikProps.errors.emailAddress}
                          </Text>
                        )}
                    </Text>
                    <Item>
                      <Label>Birthdate</Label>
                      <DatePicker
                        style={{width: 200}}
                        date={this.state.birthDate}
                        mode="date"
                        placeholder="select date"
                        format="YYYY-MM-DD"
                        minDate="1950-05-01"
                        maxDate="2010-06-01"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                          dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                          },
                          dateInput: {
                            marginLeft: 36
                          }
                          // ... You can check the source to find the other keys.
                        }}
                        onDateChange={(birthDate) => {console.warn(birthDate);this.setState({birthDate: birthDate})}}
                      />
                    </Item>
                    <Item>
                      <Label>Gender</Label>
                      <MyPicker 
                        style={{width: 200}}
                        placeholder="select gender"
                        name="gender"
                        values={[
                          { label: "male", value: "Mr" },
                          { label: "female", value: "Mrs" }
                        ]}
                      />
                    </Item>
                    <Item>
                      <Label>Password</Label>
                      <Input
                        onChangeText={formikProps.handleChange('password')}
                        secureTextEntry={true} 
                        onBlur={() => formikProps.setFieldTouched('password')}
                      />
                    </Item>
                    <Text style={styles.text_err}>
                      {formikProps.touched.password &&
                        formikProps.errors.password && (
                          <Text style={styles.text_error}>
                            {formikProps.errors.password}
                          </Text>
                        )}
                    </Text>
                  </Form>
                  <Button
                    style={styles.submit_btn}
                    onPress={formikProps.handleSubmit}>
                    <Text style={styles.submit_btn_txt}>Submit</Text>
                  </Button>
                </Card>
              </Content>
            </Container>
          </React.Fragment>
        )}
      </Formik>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  card: {
    marginTop: 80,
    width: 350,
    marginLeft: 20, 
    height: 550
  },
  form:{
    marginTop: 20,
    marginLeft: 25,
    width: 300
  },
  text_err:{
    marginLeft:20,
  },
  text_error: {
    fontSize: 12,
    color: '#FF0D10'
  },
  container_bg: {
    backgroundColor: '#052c65',
  },
  submit_btn: {
    marginTop:40,
    marginLeft:25,
    width:300,
    backgroundColor: '#052c65'
  },
  submit_btn_txt:{
    marginLeft:110
  }
});