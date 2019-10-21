import React from 'react';
import { StyleSheet, Text, View, TextInput,TouchableOpacity,TouchableWithoutFeedback,Keyboard, Image } from 'react-native';
import { Form, Item, Input, Label } from 'native-base';

//TODO nollaus nappula, asyncStorage, tallennuksen esto ilman tarvittavia tietoja


export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showText:false,
      showCards:true,
      työTunnit:'0.0',
      työaika:'0.0',
      days:'0.0',
      dayLength:'0.0',
      inHours:'0.0',
      inMinutes:'0.0',
      in:'0.0',
      out:'0.0',
      kiky:'0.0',
      outHours:'0.0',
      outMinutes:'0.0',
      päivänTunnit:'0.0',
      youMayLeave:'0.0',
      jäljelläOlevaTyöaika:'00:00:00',
      viikkotunnit:'0.0',
      restOfHoursForWeek:'0.0',
      viikonSaldo:'0.0',
      päivänSaldo:'0.0',

      showIn:'',
      showYouMayLeave:'',
      showPäivänTunnit:'',
      showDayLength:'',
      showViikkotunnit:'',
      showRestOfHoursForWeek:'',
      showViikonSaldo:'',
    }
  }

  componentWillMount(){

    this.countDown()
  }

  componentDidMount(){
    setInterval(() => this.countDown(),1000);
  }

toggleViews = () => {
  this.setState({showText:!this.state.showText})
  this.setState({showCards:!this.state.showCards})
}

inH = (hour) => {

let hours = hour

  if ( isNaN(hour) ) {
      alert('Use numbers...');
  }
  else if (hour.length > 2) {
    alert('Use max two letters...');
  }
  else if (hour > 23) {
    alert('You can set max 23...');
  }
  else {
    this.setState({inHours:hours},() =>{
      console.log(this.state.inHours);
    });
  }
}

inM = (min) => {

let minutes = min

  if ( isNaN(min) ) {
      alert('Use numbers...');
  }
  else if (min.length > 2) {
    alert('Use max two letters...');
  }
  else if (min > 60) {
    alert('You can set minutes max 60...');
  }
  else {
    this.setState({inMinutes:minutes},() =>{
      console.log(this.state.inMinutes);
    });
  }
}

dayS = (day) => {

  if ( isNaN(day) ) {
      alert('Use numbers...');
  }
  else if (day > 7) {
    alert('You can set max 7 days...');
  }
  else {
    this.setState({days:day},() =>{
      console.log(this.state.days);
    });
  }
}

työTunniT = (hour) => {
  let tunnit = hour * 60;

  if ( isNaN(hour) ) {
      alert('Use numbers...');
  }
  else if (hour.length > 2) {
    alert('Use max two letters...');
  }
  else if (hour > 23) {
    alert('You can set max 23 hours...');
  }
  else {
    this.setState({työTunnit:tunnit},() =>{
      console.log(this.state.työTunnit);
    });
  }
}
työMinuutiT = (min) => {
  let minuutit = min;
  if ( isNaN(min) ) {
      alert('Use numbers...');
  }
  else if (min.length > 2) {
    alert('Use max two letters...');
  }
  else if (min > 60) {
    alert('You can set minutes max 60...');
  }
  else {
    this.setState({työMinuutit:minuutit}, () => {
      console.log(this.state.työMinuutit);
  });
  }
}

saveIn = () => {
  let inTime = this.state.inHours +'.'+ this.state.inMinutes
  this.setState({in:inTime}, () => {
    this.countDown();
    this.showTimes();
  });
}

countDown = () =>{


  //let sumTime = Number(this.state.in) + Number(this.state.dayLength);
  let d1 = this.state.in.split('.');
  let out1 = new Date(2019, 1, 2, d1[0], d1[1]).getTime();
  let kiky = this.state.kiky;

  let d = this.state.dayLength.split('.');
  let out = new Date(2019, 1, 2, d[0], d[1]).getTime();

  let inHourmin = d1[0]*60;
  let outHourmin = d[0]*60;

  let fullmin = Number(kiky) + Number(inHourmin) + Number(outHourmin) + Number(d[1]) + Number(d1[1] );


  let sec = Math.floor((fullmin/60) % 60);
  let min = Math.floor(fullmin % 60);
  let hour = Math.floor(fullmin / 60);

  let away = hour + ':' + min + ':' + sec;

  let toGo = new Date();
    toGo.setHours(hour);
    toGo.setMinutes(min);
    toGo.setSeconds(sec);
  this.setState({youMayLeave:toGo.getHours() + '.' + toGo.getMinutes()},() =>{
    this.showTimes();
  });

      let toGo1 = new Date().getTime();
      let togoMill = toGo.getTime();
      let distance = togoMill - toGo1;


    //let theGo = new Date(toGo.getTime() - toGo1.getTime());
  //  console.log(toGo);

    let seconds = Math.floor((distance % (1000*60)) / 1000);
    let minutes = Math.floor((distance % (1000*60*60)) / (1000*60));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    hours = hours < 10 ? '0' + hours: hours;
    minutes = minutes < 10 ? '0' + minutes: minutes;
    seconds = seconds < 10 ? '0' + seconds: seconds;

    let counter = hours + ':' + minutes + ':' + seconds;
    this.setState({jäljelläOlevaTyöaika:counter});
  //  console.log(counter);
}


PTunnit = () => {
let kminut = this.state.työMinuutit
let ktun = this.state.työTunnit;
let fullmin = (Number(kminut) + Number(ktun));
let hours = Math.floor(fullmin/60);
let minutes = fullmin % 60;
let fullday = hours + '.' + minutes;
this.setState({dayLength:fullday}, () =>{
  this.showTimes();
//  console.log(Number(this.state.dayLength));
});

}

workDays = () => {
  if (this.state.days > 7) {
    alert('sinun pitäisi levätä välillä');
  }
  let weekMinutes = Number(this.state.days) * (Number(this.state.työTunnit) + Number(this.state.työMinuutit))
  let hours = Math.floor(weekMinutes/60);
  let minutes = weekMinutes % 60;
  let week = hours +'.'+ minutes;
  this.setState({viikkotunnit:week}, () => {
    this.showTimes();
  });
//  console.log(this.state.viikkotunnit);
}

restHours = () => {
  let outTime = this.state.outHours +'.'+ this.state.outMinutes;
  this.setState({out:outTime});

let d1 = new Date();
  d1.setHours(this.state.outHours);
  d1.setMinutes(this.state.outMinutes);

//let mill1 = d1.getTime();
let d2 = new Date();
  d2.setHours(this.state.inHours);
  d2.setMinutes(this.state.inMinutes);

  let d11 = d1.getTime();
  let d22 = d2.getTime();
//let mill2 = d2.getTime();
let diff = d11 - d22;

//let fullminutes = diff.getTime()/1000/60;
let hours = Math.floor((diff % (1000* 60 * 60 * 24)) / (1000 * 60 * 60));
let minutes = ((diff % (1000 * 60 *60)) / (1000 * 60));
let theHours = hours + '.' + minutes;
console.log(theHours);
  this.setState({päivänTunnit:theHours},()=>{


    let w1 = this.state.viikkotunnit.split('.');
    let dH1 = this.state.päivänTunnit.split('.');
    let weekHours = new Date(2019, 1, 2, w1[0], w1[1]);
    let daysHours = new Date(2019, 1, 2, dH1[0], dH1[1])
    let restOfWeek = new Date(weekHours - daysHours);

    let mindiff = restOfWeek.getTime()/1000/60;

    let weekmins = mindiff % 60;
    let weekhour = Math.floor(mindiff/60);
    let fullHours = weekhour +'.'+ weekmins;

    this.setState({restOfHoursForWeek:fullHours}, () => {
      this.showTimes();
    });


    //  console.log(fullHours);
      this.restOfHours();
  });

}

restOfHours = () => {
  let weekHoursMin = this.state.viikkotunnit.split('.');
  let dayLengthMin = this.state.dayLength.split('.');
  let restWeeHour = (Number(weekHoursMin[0]*60 ) + Number(weekHoursMin[1]))*-1 + Number(dayLengthMin[0]*60) + Number(dayLengthMin[1]);

  let min = Math.floor(restWeeHour % 60);
  let hour = Math.floor(restWeeHour / 60);
  this.setState({viikonSaldo:hour + ':' + min}, () => {
    this.showTimes();
  });
//    console.log(hour + ':' + min);
}

showTimes = () => {
  //sisääntulo
  let int = this.state.in.split('.')
  let inH = int[0] < 10 ? '0' + int[0] : int[0];
  let inM = int[1] < 10 ? '0' + int[1] : int[1];
  this.setState({showIn: inH + ':' + inM});
  //pois lähtö
  let away = this.state.youMayLeave.split('.');
  let aH = away[0] < 10 ? '0' + away[0] : away[0];
  let aM = away[1] < 10 ? '0' + away[1] : away[1];
  this.setState({showYouMayLeave: aH + ':' + aM});
  //päivän tunnit
  let dlength = this.state.dayLength.split('.');
  let dH = dlength[0] < 10 ? '0' + dlength[0] : dlength[0];
  let dM = dlength[1] < 10 ? '0' + dlength[1] : dlength[1];
  this.setState({showDayLength: dH + ':' + dM});
  //Viikkotunnit
  let weekHours = this.state.viikkotunnit.split('.');
  let wH = weekHours[0] < 10 ? '0' + weekHours[0] : weekHours[0];
  let wM = weekHours[1] < 10 ? '0' + weekHours[1] : weekHours[1];
  this.setState({showViikkotunnit: wH + ':' + wM});
  //jäljellä olevat viikkotunnit
  let restWeekHours = this.state.restOfHoursForWeek.split('.');
  let rwH = restWeekHours[0] < 10 ? '0' + restWeekHours[0] : restWeekHours[0];
  let rwM = restWeekHours[1] < 10 ? '0' + restWeekHours[1] : restWeekHours[1];
  this.setState({showRestOfHoursForWeek: rwH + ':' + rwM});
  //viikonSaldo
  let saldo = this.state.viikonSaldo.split('.');
  let sH = saldo[0] < 10 ? '0' + saldo[0] : saldo[0];
  let sM = saldo[1] < 10 ? '0' + saldo[1] : saldo[1];
  this.setState({showViikonSaldo: sH + ':' + sM});
console.log('minä toimin');
}

render(){
  return (
    <TouchableWithoutFeedback
      onPress = { () => {
        Keyboard.dismiss();
      }}>

<View style={styles.container}>

    <Image
  style={{
    backgroundColor: '#ccc',
    flex: 1,
    resizeMode:'cover',
    position: 'absolute',
    width: '100%',
    height: '120%',
    justifyContent: 'center',
  }}
  source={require('./assets/Background.png')}
/>


{
this.state.showCards ? <View>
        <View style={styles.cardView}>


            <View style={styles.card}>
                <View style={styles.InputView}>

                <Text>Sisään</Text>

                <Form style={styles.Form} >

                      <Item style={{height:50, width: 55}} >

                        <Input
                        style={styles.TextInput}
                        autoCorrect = {false}
                        autoCapitalize = "none"
                        keyboardType = "number-pad"
                        placeholder = '0-24'
                        onChangeText = {value => this.inH(value)}
                        />
                      </Item>
                      <Text>Tunnit</Text>
                      <Item style={{height:50, width: 55}} >

                        <Input
                        style={styles.TextInput}
                        autoCorrect = {false}
                        autoCapitalize = "none"
                        keyboardType = "number-pad"
                        placeholder = '1-59'
                        onChangeText = {(value) => this.inM(value)}
                        />
                      </Item>
                      <Text>Minuutit</Text>
                    </Form>

                </View>
            </View>

            <View style={styles.card}>
                      <View style={styles.InputView}>
                          <Text>Työaika</Text>
                      <Form style={styles.Form} >

                            <Item style={{height:50, width: 55}} >

                              <Input
                              style={styles.TextInput}
                              autoCorrect = {false}
                              autoCapitalize = "none"
                              keyboardType = "number-pad"
                              placeholder = 'h'
                              onChangeText = {(value) => this.työTunniT(value)}
                              />
                            </Item>
                            <Text>Tunnit</Text>
                            <Item style={{height:50, width: 55}} >

                              <Input
                              style={styles.TextInput}
                              autoCorrect = {false}
                              autoCapitalize = "none"
                              keyboardType = "number-pad"
                              placeholder = 'min'
                              onChangeText = {(value) => this.työMinuutiT(value)}
                              />
                            </Item>
                            <Text>Minuutit</Text>
                          </Form>
                      </View>
            </View>

            <View style={styles.card}>
                      <View style={styles.InputView}>
                                <Text>Työpäivät</Text>
                            <Form style={styles.Form} >

                                  <Item style={{height:50, width: 55}} >

                                    <Input
                                    style={styles.TextInput}
                                    autoCorrect = {false}
                                    autoCapitalize = "none"
                                    keyboardType = "number-pad"
                                    placeholder = '0-7'
                                    onChangeText = {value => this.dayS(value)}
                                    />
                                  </Item>
                                  <Text>Päivät</Text>
                                </Form>
                      </View>
            </View>

            <View style={styles.card}>
                      <View style={styles.InputView}>
                                      <Text>Kiky</Text>
                                  <Form style={styles.Form} >

                                        <Item style={{height:50, width: 55}} >

                                          <Input
                                          style={styles.TextInput}
                                          autoCorrect = {false}
                                          autoCapitalize = "none"
                                          keyboardType = "number-pad"
                                          placeholder = '0-60'
                                          onChangeText = {kiky => this.setState({kiky})}
                                          />
                                        </Item>
                                        <Text>Minuutit</Text>
                                      </Form>
                      </View>
            </View>

            </View>

            <View style={styles.cardView}>


            <TouchableOpacity style={{alignSelf: 'stretch', justifyContent: 'center', alignItems: 'center', height: 50, borderWidth: 2, borderRadius: 100, backgroundColor: '#3B064D', marginTop: 30}}
            onPress= {() => {this.saveIn();this.PTunnit();this.workDays();this.toggleViews();}}
            >
            <Text style={{color: 'white', fontSize: 30}}>SAVE</Text>
            </TouchableOpacity>
            </View>

          </View>:null
}
{
  this.state.showText ? <View style={styles.textView} >
        <Text style={{fontSize: 50}}>{this.state.jäljelläOlevaTyöaika}</Text>
  <View style={styles.cardView}>
      <Text style={{fontSize: 20, margin: 10}}>Sisään: {this.state.showIn}</Text>
      <Text style={{fontSize: 20, margin: 10}}>Päivä täynnä: {this.state.showYouMayLeave}</Text>
      <Text style={{fontSize: 20, margin: 10}}>päivän tehdyt tunnit: {this.state.päivänTunnit}</Text>
      <Text style={{fontSize: 20, margin: 10}}>päivän tunnit: {this.state.showDayLength}</Text>
      <Text style={{fontSize: 20, margin: 10}}>viikkotunnit: {this.state.showViikkotunnit}</Text>
      <Text style={{fontSize: 20, margin: 10}}>jäljellä olevat viikkotunnit: {this.state.showRestOfHoursForWeek}</Text>
      <Text style={{fontSize: 20, margin: 10}}>viikon saldo: {this.state.viikonSaldo}</Text>
  </View>
  <View style={styles.cardView}>
        <View style={styles.card}>
                  <View style={styles.InputView}>
                      <Text>Ulos</Text>
                  <Form style={styles.Form} >

                        <Item style={{height:50, width: 55}} >

                          <Input
                          style={styles.TextInput}
                          autoCorrect = {false}
                          autoCapitalize = "none"
                          keyboardType = "number-pad"
                          placeholder = '0-24'
                          onChangeText = {outHours => this.setState({outHours})}
                          />
                        </Item>
                        <Text>Tunnit</Text>
                        <Item style={{height:50, width: 55}} >

                          <Input
                          style={styles.TextInput}
                          autoCorrect = {false}
                          autoCapitalize = "none"
                          keyboardType = "number-pad"
                          placeholder = '1-59'
                          onChangeText = {outMinutes => this.setState({outMinutes})}
                          />
                        </Item>
                        <Text>Minuutit</Text>


                      </Form>

                  </View>

    </View>
    <TouchableOpacity style={{alignSelf: 'stretch', justifyContent: 'center', alignItems: 'center', height: 50, borderWidth: 2, borderRadius: 100, backgroundColor: '#3B064D', marginTop: 30}}
    onPress= {() => {this.restHours();}}
    >
    <Text style={{color: 'white', fontSize: 30}}>SAVE EXIT</Text>
    </TouchableOpacity>
    <TouchableOpacity style={{alignSelf: 'stretch', justifyContent: 'center', alignItems: 'center', height: 50, borderWidth: 2, borderRadius: 100, backgroundColor: '#3B064D', marginTop: 30}}
    onPress= {() => {this.toggleViews();}}
    >
    <Text style={{color: 'white', fontSize: 30}}>New Time</Text>
    </TouchableOpacity>
  </View>


</View>:null
}

    </View>
    </TouchableWithoutFeedback>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    paddingTop: 60,
    justifyContent: 'flex-end'
  },
  cardView:{
    alignSelf: 'stretch',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 5,
    padding: 5
  },
  TextInput:{
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: '#707070',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    justifyContent: 'center',
    height: 50,
  },

  InputView:{
    alignItems: 'flex-start'
  },
  Form:{
    flexDirection: 'row',
    alignItems: 'center'
  },
  card:{
    borderColor: '#707070',
    borderBottomWidth: 0.5,
    paddingVertical: 15
  },
   Button: {
    height: 50,
    width: 50,
    borderWidth: 2,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20
  },
  textView:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
