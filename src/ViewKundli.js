import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ActivityIndicator,
  Switch,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Colors from './Utitlies/Colors';
import { ApiCall, ApiCall2, ApiCall3 } from './ApiCall';
import Svg, { Circle, SvgXml } from 'react-native-svg';
import { SvgUri } from 'react-native-svg';
import KunsliChart from './KunsliChart';
import { globalStyles } from './utils/GlobalStyles';
import axios from 'axios';
import theme from './utils/theme';
import { CustomButton } from '../components/CustomButton';
// import PageHeader from '../components/PageHeader';
import moment from 'moment';
import Header from './component/Header';

const KundliDetails = ({ navigation, route }) => {

  const [svgCode, setSvgCode] = useState(null);
  const [Selected, setSelected] = useState(1);
  const [Lagna, setLagna] = useState([]);
  const [Navamsa, setNavamsa] = useState();
  const [Transit, setTransit] = useState([]);
  const [DivisionalSelect, setDivisionalSelect] = useState(1);
  const [lang,setLang]=useState('en');
  const [isHindi, setIsHindi] = useState(false);  // Toggle state for Hindi

  // Function to toggle between languages
  const toggleLanguage = () => {
    setIsHindi(previousState => !previousState);
    setLang(isHindi ? 'en' : 'hi');  // Set language based on toggle
  };

  const name = route.params.name;
  const gender = route.params.gender;
  const DOB = route.params.dob;
  const POB = route.params.pob;
  const TOB = route.params.tob;
  const lat = route.params.lat;
  const lon = route.params.lon;

  const dateParts = DOB?.split('/');
  const day = dateParts[0];
  const month = dateParts[1];
  const year = dateParts[2];
  const [Sunset, setSunset] = useState();
  const [Sunrise, setSunrise] = useState();

  const [Acsedent, setAcsedent] = useState();
  const [Kalsarpa, setKalsarpa] = useState();
  const [mangal, setMangal] = useState();
  const [manglik, setManglik] = useState();
  const [division,setDivision]=useState(false);
  const [pitra, setPitra] = useState();
  const [papasmaya, setPapasmaya] = useState();
  const [PlanetData, setPlanetData] = useState([]);
  const [dasha,setDasha]=useState()
  const [dasha2,setDasha2]=useState()

  const [GhatChakra, setGhatChakra] = useState({});
  const [NumeroTable, setNumeroTable] = useState({});
  const [BasicPanchang, setBasicPanchang] = useState({});
  const [SVG, setSvg] = useState({});
  const [KalsarpaPresent, setKalsarpaPresent] = useState(false);
  const [active, setActive] = useState('Basic');
  const [Sun, setSun] = useState([]);
  const [Moon, setMoon] = useState([]);
  const [personalch, setPersonalch] = useState();
  const [D2, setD2] = useState([]);
  const [D3, setD3] = useState([]);
  const [D4, setD4] = useState([]);
  const [D7, setD7] = useState([]);
  const [D10, setD10] = useState([]);
  const [D16, setD16] = useState([]);
  const [D20, setD20] = useState([]);
  const [D24, setD24] = useState([]);
  const [D30, setD30] = useState([]);
  const [D40, setD40] = useState([]);
  const [D45, setD45] = useState([]);
  const [D60, setD60] = useState([]);

  const timeParts = TOB.split(':');
  const hour = timeParts[0];
  const minute = timeParts[1];

  const data = {
    day: day,
    month: month,
    year: year,
    hour: hour,
    lang:lang,
    min: minute,
    lat: lat,
    lon: lon,
    tzone: 5.5,
  };

  const DivisionalHeaderData = [
    {
      Number: 1,
      Name: 'Chalit',
    },
    {
      Number: 2,
      Name: 'Sun',
    },
    {
      Number: 3,
      Name: 'Moon',
    },
    {
      Number: 4,
      Name: 'Horo(D-2)',
    },
    {
      Number: 5,
      Name: 'Drekkana(D-3)',
    },
    {
      Number: 6,
      Name: 'Chathurthamasha(D-4)',
    },
    {
      Number: 7,
      Name: 'Saptamansha(D-7)',
    },
    {
      Number: 8,
      Name: 'Dashamansha(D-7)',
    },
    {
      Number: 9,
      Name: 'Shodashamsha(D-16)',
    },
    {
      Number: 10,
      Name: 'Vishamansha(D-20)',
    },
    {
      Number: 11,
      Name: 'Chaturvimshamsha ',
    },
    {
      Number: 12,
      Name: 'Trishamansha(D-30)',
    },
    {
      Number: 13,
      Name: 'Khavedamsha(D-40)',
    },
    {
      Number: 14,
      Name: 'Akshvedansha(D-45)',
    },
    {
      Number: 15,
      Name: 'Shashtymsha(D-60)',
    },
  ];
  const [chartype, setchatrype] = useState('D1');
  const types = [
    { "value": "D1", "name": "Lagna" },
    { "value": "D9", "name": "Navmsa" },
    // { "value": "sun", "name": "Divisional" },



 
    // { "value": "chalit", "name": "chalit" },
    // { "value": "kp_chalit", "name": "kpchalit" }
  ]
  const types2 = [
    { value: "sun", name: "Sun", hindiName: "सूर्य" },
    { value: "moon", name: "Moon", hindiName: "चाँद" },
    { value: "D1", name: "D1 Lagna", hindiName: "डी1 लग्न" }, // Updated
    { value: "D2", name: "D2 Hora", hindiName: "डी2 होरा" },
    { value: "D3", name: "D3 Drekkana", hindiName: "डी3 द्रेष्काण" }, // Updated
    { value: "D4", name: "D4 Chaturthamsa", hindiName: "डी4 चतुर्थांश" },
    { value: "D7", name: "D7 Saptamsa", hindiName: "डी7 सप्तमांश" },
    { value: "D9", name: "D9 Navamsa", hindiName: "डी9 नवमांश" },
    { value: "D10", name: "D10 Dasamsa", hindiName: "डी10 दशमांश" },
    { value: "D12", name: "D12 Dwadasamsa", hindiName: "डी12 द्वादशांश" },
    { value: "D16", name: "D16 Shodasamsa", hindiName: "डी16 षोडशांश" },
    { value: "D20", name: "D20 Vimsamsa", hindiName: "डी20 विशांश" }, // Updated
    { value: "D24", name: "D24 Siddhamsa", hindiName: "डी24 चतुर्विशांश" }, // Updated
    { value: "D27", name: "D27 Bhamsa", hindiName: "डी27 सप्तविंशांश" }, // Updated
    { value: "D30", name: "D30 Trimshamsa", hindiName: "डी30 त्रिंशांश" },
    { value: "D40", name: "D40 Khavedamsa", hindiName: "डी40 खवेदांश" },
    { value: "D45", name: "D45 Akshavedamsa", hindiName: "डी45 अक्षवेदांश" },
    { value: "D60", name: "D60 Shashtiamsa", hindiName: "डी60 षष्टांश" }
  ];
  
  
  
  
  const chatcall = async () => {
    try {
      ApiCall3(
        'https://api.vedicastroapi.com/v3-json/horoscope/chart-image',
        { ...data, div: chartype },
      ).then(response => {
        console.log(response?.replace(/color:undefined;/g, 'color:black;').replace(/fill:undefined;/g, 'fill:black;'), "transitx")
        setTransit(response);
      });

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    chatcall()
  }, [chartype])

  const DivisionalHeader = ({ item }) => (
    <TouchableOpacity
      onPress={() => setDivisionalSelect(item.Number)}
      style={[
        styles.DivisonalHeadTabBarButton,
        DivisionalSelect == item.Number &&
        styles.DivisonalHeadTabBarButtonSelected,
      ]}>
      <Text style={[styles.HeadTabBarText, { color: check == 4 ? "white" : "black" }]}>{item.Name}</Text>
    </TouchableOpacity>
  );

  const fetchdata = () => {
    ApiCall2('https://api.vedicastroapi.com/v3-json/dosha/kaalsarp-dosh', data).then(
      response => {
        // console.log('response', response);
        setKalsarpa(response?.bot_response);
        setKalsarpaPresent(response ? true : false
        );
        console.log(KalsarpaPresent);
      },
    );
    ApiCall2('https://api.vedicastroapi.com/v3-json/horoscope/personal-characteristics', data).then(
      response => {
        // console.log('response', response);
        // setKalsarpa(response?.bot_response);
        // setKalsarpaPresent(response?true:false);
        console.log(response, "pch");
        setPersonalch(response)
      },
    );
    ApiCall2('https://api.vedicastroapi.com/v3-json/dosha/mangal-dosh', data).then(
      response => {
        // console.log('response', response);
        setMangal(response?.bot_response);
      },
    );
    ApiCall2('https://api.vedicastroapi.com/v3-json/dosha/pitra-dosh', data).then(
      response => {
        // console.log('response', response);
        setPitra(response?.bot_response);
      },
    );
    ApiCall2('https://api.vedicastroapi.com/v3-json/dashas/maha-dasha-predictions', data).then(
      response => {
        console.log('dass', response);
        setDasha(response,);
      },
    );
    ApiCall2('https://api.vedicastroapi.com/v3-json/dashas/maha-dasha', data).then(
      response => {
        console.log('dass', response);
        setDasha2(response,);
      },
    );
    ApiCall2('https://api.vedicastroapi.com/v3-json/dosha/manglik-dosh', data).then(
      response => {
        // console.log('response', response);
        setManglik(response?.bot_response);
      },
    );
    ApiCall2('https://api.vedicastroapi.com/v3-json/dosha/papasamaya', data).then(
      response => {
        console.log('response papa', response);
        setPapasmaya(response);
      },
    );

    ApiCall2(
      'https://api.vedicastroapi.com/v3-json/horoscope/ascendant-report',
      data,
    ).then(response => {
      console.log("asccc", response);
      setAcsedent(response);
    });
    ApiCall2('https://api.vedicastroapi.com/v3-json/horoscope/planet-details', data).then(response => {
      console.log("responsePlanet", Object?.values(response)[0]);
      setPlanetData(Object?.values(response));
      console.log(PlanetData)
    });

    axios.get(`https://api.vedicastroapi.com/v3-json/prediction/numerology?name=Human&date=${data?.day + "/" + data.month + "/" + data.year}5&api_key=c7cd440e-d66f-5f58-ad49-851639299609&lang=${lang}`, data).then(
      response => {
        // console.log("response",response);
        console.log("Numero Table1", response?.data)
        setNumeroTable(response?.data?.response);
        // console.log(GhatChakra)
      },
    );


    ApiCall(
      'https://json.astrologyapi.com/v1/horo_chart/SUN',
      data,
    ).then(response => {
      setSun(response);
    });

    ApiCall(
      'https://json.astrologyapi.com/v1/horo_chart/MOON',
      data,
    ).then(response => {
      setMoon(response);
    });
    ApiCall('https://json.astrologyapi.com/v1/horo_chart/D2', data).then(
      response => {
        setD2(response);
      },
    );
    ApiCall('https://json.astrologyapi.com/v1/horo_chart/D3', data).then(
      response => {
        setD3(response);
      },
    );
    ApiCall('https://json.astrologyapi.com/v1/horo_chart/D4', data).then(
      response => {
        setD4(response);
      },
    );
    ApiCall('https://json.astrologyapi.com/v1/horo_chart/D7', data).then(
      response => {
        setD7(response);
      },
    );
    ApiCall(
      'https://json.astrologyapi.com/v1/horo_chart/D10',
      data,
    ).then(response => {
      setD10(response);
    });
    ApiCall(
      'https://json.astrologyapi.com/v1/horo_chart/D16',
      data,
    ).then(response => {
      setD16(response);
    });
    ApiCall(
      'https://json.astrologyapi.com/v1/horo_chart/D20',
      data,
    ).then(response => {
      setD20(response);
    });
    ApiCall(
      'https://json.astrologyapi.com/v1/horo_chart/D24',
      data,
    ).then(response => {
      setD24(response);
    });
    ApiCall(
      'https://json.astrologyapi.com/v1/horo_chart/D30',
      data,
    ).then(response => {
      setD30(response);
    });
    ApiCall(
      'https://json.astrologyapi.com/v1/horo_chart/D40',
      data,
    ).then(response => {
      setD40(response);
    });
    ApiCall(
      'https://json.astrologyapi.com/v1/horo_chart/D45',
      data,
    ).then(response => {
      setD45(response);
    });
    ApiCall(
      'https://json.astrologyapi.com/v1/horo_chart/D60',
      data,
    ).then(response => {
      setD60(response);
    });
    SetLoading(false);
  };

  useEffect(() => {
    SetLoading(true);
    fetchdata();

  }, [lang]);

  const [check, setcheck] = useState(1);

  const handleBasic = () => {
    setcheck(1);
  };
  const handlecharts = () => {
    setcheck(2);
  };
  const Planets = () => {
    setcheck(3);
  };
  const HGhatChakra = () => {
    setcheck(4);
  };
  const HNumeroTable = () => {
    setcheck(5);
  };
  const report = () => {
    setcheck(6);
  };

  // const SvgImage = async() => {
  //   return (
  //     <View>
  //       <Text>hello</Text>
  //       <SvgXml xml={SVG} style={{alignSelf: 'center'}} />
  //     </View>
  //   );
  // };

  const PlanetTable = ({ item }) => (
    <View style={{ width: '100%' }}>
      <View style={{ flexDirection: 'row', width: '100%' }}>
        <Text
          style={{
            width: 73,
            marginVertical: 5,
            fontSize: 12,
            textAlign: 'center',
            color: Colors.TextDarkColour
          }}>
          {item.full_name}
        </Text>
        <Text style={styles.tableRow}>{item.zodiac}</Text>
        <Text style={styles.tableRow}>{item.zodiac_lord}</Text>
        <Text numberOfLines={1} style={styles.tableRow}>
          {Number(item.local_degree).toFixed(2)}

        </Text>
        <Text numberOfLines={1} style={styles.tableRow}>
          {item.house}
        </Text>
      </View>
    </View>
  );

  const [isLoading, SetLoading] = useState(true);

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      {/* <Header/> */}
      
 <View style={[globalStyles.rowflex,{paddingHorizontal:5}]}>
        <View style={{flexDirection:"row",alignItems:'center'}}>
        <Text style={[globalStyles.text,{marginRight:2}]}>{'En'}</Text>
        <Switch
          onValueChange={toggleLanguage}
          value={isHindi}
        />
                <Text style={[globalStyles.text,]}>{'हिं'}</Text>
      </View>
        </View>    
          <ActivityIndicator
        size={'large'}
        color={Colors.PrimaryColor}
        animating={isLoading}
        style={{
          position: 'absolute',
          alignSelf: 'center',
          top: '50%',
          zIndex: 1,
        }}
      />
      {isLoading ? <View style={{ height: '100%', width: '100%' }}></View> : null}
      <View style={styles.ChartHeadTabBar}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            onPress={handleBasic}
            style={[
              styles.HeadTabBarButton,
              check == 1 && styles.HeadTabBarButtonSelected,
            ]}>
            <Text style={[styles.HeadTabBarText, { color: check == 1 ? "white" : "black" }]}>Basic</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handlecharts}
            style={[
              styles.HeadTabBarButton,
              check == 2 && styles.HeadTabBarButtonSelected,
            ]}>
            <Text style={[styles.HeadTabBarText, { color: check == 2 ? "white" : "black" }]}>Charts</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { setcheck(9); setchatrype('kp_chalit') }}
            style={[
              styles.HeadTabBarButton,
              check == 9 && styles.HeadTabBarButtonSelected,
            ]}>
            <Text style={[styles.HeadTabBarText, { color: check == 9 ? "white" : "black" }]}>Kp Chalit</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            onPress={() => { setcheck(8) }}
            style={[
              styles.HeadTabBarButton,
              check == 8 && styles.HeadTabBarButtonSelected,
            ]}>
            <Text style={[styles.HeadTabBarText, { color: check == 8 ? "white" : "black" }]}>Personal Characteristics</Text>
          </TouchableOpacity> */}

          <TouchableOpacity
            onPress={HGhatChakra}
            style={[
              styles.HeadTabBarButton,
              check == 4 && styles.HeadTabBarButtonSelected,
            ]}>
            <Text style={[[styles.HeadTabBarText, { color: check == 4 ? "white" : "black" }], { color: check == 4 ? "white" : "black" }]}>Dasha</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={HNumeroTable}
            style={[
              styles.HeadTabBarButton,
              check == 5 && styles.HeadTabBarButtonSelected,
            ]}>
            <Text style={[styles.HeadTabBarText, { color: check == 5 ? "white" : "black" }]}>Numerology</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={report}
            style={[
              styles.HeadTabBarButton,
              check == 6 && styles.HeadTabBarButtonSelected,
            ]}>
            <Text style={[styles.HeadTabBarText, { color: check == 6 ? "white" : "black" }]}>Report</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      {check == 8 && <ScrollView style={{ flex: 1 }}>
        {personalch?.map((item) => (
          <View style={{ backgroundColor: "white", marginVertical: 6, paddingHorizontal: 15, paddingVertical: 3 }}>
            <Text style={[globalStyles.text]}>{item?.current_house} {item?.current_zodiac}</Text>
            <View>{Object?.entries(item)?.map((ite) => (
              <Text style={[globalStyles.text2, { opacity: .6 }]}>{Object.entries(ite)?.[0][1]?.replaceAll("_", " ")} : {Object.entries(ite)?.[1][1]}</Text>
            ))}</View>
            <Text></Text>
          </View>
        ))}
      </ScrollView>}
      {check == 1 ? (
        <ScrollView>
          <Text style={styles.heading}>Basic Details</Text>
          <View style={styles.DetailContainer}>
            <View style={styles.DetailBox}>
              <Text style={styles.detailKey}>Name</Text>
              <Text style={styles.detailAnswer}>{name}</Text>
            </View>
            <View style={styles.DetailBox2}>
              <Text style={styles.detailKey}>Gender</Text>
              <Text style={styles.detailAnswer}>{gender}</Text>
            </View>
            <View style={styles.DetailBox}>
              <Text style={styles.detailKey}>Date of Birth</Text>
              {/* <Text style={styles.detailAnswer}>{DOB.substring(0, 1)}</Text>*/}
              <Text style={styles.detailAnswer}>{DOB}</Text>
            </View>
            <View style={styles.DetailBox2}>
              <Text style={styles.detailKey}>Time of Birth</Text>
              <Text style={styles.detailAnswer}>{TOB}</Text>
            </View>
            <View style={styles.DetailBox}>
              <Text style={styles.detailKey}>Place of Birth</Text>
              <Text numberOfLines={1} style={styles.detailAnswer}>
                {POB}
              </Text>
            </View>
            <View style={styles.DetailBox2}>
              <Text style={styles.detailKey}>Latitude</Text>
              <Text style={styles.detailAnswer}>{lat}</Text>
            </View>
            
            <View style={styles.DetailBox2}>
              <Text style={styles.detailKey}>longitude</Text>
              <Text style={styles.detailAnswer}>{lon}</Text>
            </View>
            {/* <View style={styles.DetailBox}>
              <Text style={styles.detailKey}>Sunrise</Text>
              <Text style={styles.detailAnswer}>{Sunrise}</Text>
            </View>
            <View style={styles.DetailBox2}>
              <Text style={styles.detailKey}>Sunset</Text>
              <Text style={styles.detailAnswer}>{Acsedent?.sunrise_at_birth}</Text>
            </View> */}
          </View>

          <View>
            <Text style={styles.heading}> Kalsarpa Details</Text>
            <View style={styles.DetailContainer}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                <Text
                  style={{
                    marginRight: 5,
                    marginLeft: 5,
                    color: 'black',
                    width: 280,
                  }}>
                  {Kalsarpa}
                </Text>
              </View>
            </View>
          </View>
          <View>
            <Text style={styles.heading}>Mangal Dosh Details</Text>
            <View style={styles.DetailContainer}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                <Text
                  style={{
                    marginRight: 5,
                    marginLeft: 5,
                    color: 'black',
                    width: 280,
                  }}>
                  {mangal}
                </Text>
              </View>
            </View>
          </View>
          <View>
            <Text style={styles.heading}>Manglik Dosh</Text>
            <View style={styles.DetailContainer}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                <Text
                  style={{
                    marginRight: 5,
                    marginLeft: 5,
                    color: 'black',
                    width: 280,
                  }}>
                  {manglik}
                </Text>
              </View>
            </View>
          </View>
          <View>
            <Text style={styles.heading}>Pitra Dosh</Text>
            <View style={styles.DetailContainer}>
              <View style={{ flexDirection: 'row', alignItems: 'center',padding:5 }}>

                <Text
                  style={{
                    // marginRight: 5,
                    // marginLeft: 5,
                    color: 'black',
                    // width: 280,
                  }}>
                  {pitra}
                </Text>
              </View>
            </View>
          </View>
          <View>
            <Text style={styles.heading}>Papasamaya</Text>
            <View style={styles.DetailContainer}>
              <View style={{ flexDirection: 'column',alignItems:'flex-start',justifyContent:"flex-start", }}>
              {papasmaya&&Object.entries(papasmaya)?.map((item)=>(<Text style={[globalStyles.text2]}>{item[0]?.replaceAll("_"," ")?.replace('papa',"")} : {item[1]}</Text>))}

              </View>
            </View>
          </View>

          {/* <Text style={styles.heading}>Basic Panchang</Text>
          <View style={styles.DetailContainer}>
            <View style={styles.DetailBox}>
              <Text style={styles.detailKey}>Day</Text>
              <Text style={styles.detailAnswer}>{BasicPanchang.day}</Text>
            </View>
            <View style={styles.DetailBox2}>
              <Text style={styles.detailKey}>Tithi</Text>
              <Text style={styles.detailAnswer}>{BasicPanchang.tithi}</Text>
            </View>
            <View style={styles.DetailBox}>
              <Text style={styles.detailKey}>Nakshatra</Text>
              <Text style={styles.detailAnswer}>{BasicPanchang.nakshatra}</Text>
            </View>
            <View style={styles.DetailBox2}>
              <Text style={styles.detailKey}>Yog</Text>
              <Text style={styles.detailAnswer}>{BasicPanchang.yog}</Text>
            </View>
            <View style={styles.DetailBox}>
              <Text style={styles.detailKey}>Karan</Text>
              <Text style={styles.detailAnswer}>{BasicPanchang.karan}</Text>
            </View>
            <View style={styles.DetailBox2}>
              <Text style={styles.detailKey}>Sunrise</Text>
              <Text style={styles.detailAnswer}>{BasicPanchang.sunrise}</Text>
            </View>
            <View style={styles.DetailBox}>
              <Text style={styles.detailKey}>Sunset</Text>
              <Text style={styles.detailAnswer}>{BasicPanchang.sunset}</Text>
            </View>
            <View style={styles.DetailBox2}>
              <Text style={styles.detailKey}>Vedic Sunrise</Text>
              <Text style={styles.detailAnswer}>
                {BasicPanchang.vedic_sunrise}
              </Text>
            </View>
            <View style={styles.DetailBox}>
              <Text style={styles.detailKey}>Vedic Sunset</Text>
              <Text style={styles.detailAnswer}>
                {BasicPanchang.vedic_sunset}
              </Text>
            </View>
          </View> */}
        </ScrollView>
      ) : null}

      {check == 2 || check == 9 ? (
        // <View>
        //   {/* <Text style={styles.heading}>Horo Chart</Text> */}
        //   {/* <SvgXml xml={SVG} style={{alignSelf: 'center'}} /> */}
        //   <View style={styles.ChartHeadTabBar}>
        //     <TouchableOpacity
        //       onPress={() => setSelected(1)}
        //       style={[
        //         styles.ChartHeadTabBarButton,
        //         {
        //           borderColor: Selected == 1 ? Colors.PrimaryColor : null,
        //           borderBottomWidth: Selected == 1 ? 2 : null,
        //         },
        //       ]}>
        //       <Text style={styles.ChartHeadTabBarText}>Lagna</Text>
        //     </TouchableOpacity>
        //     <TouchableOpacity
        //       onPress={() => setSelected(2)}
        //       style={[
        //         styles.ChartHeadTabBarButton,
        //         {
        //           borderColor: Selected == 2 ? Colors.PrimaryColor : null,
        //           borderBottomWidth: Selected == 2 ? 2 : null,
        //         },
        //       ]}>
        //       <Text style={styles.ChartHeadTabBarText}>Navamsa</Text>
        //     </TouchableOpacity>
        //     <TouchableOpacity
        //       onPress={() => setSelected(3)}
        //       style={[
        //         styles.ChartHeadTabBarButton,
        //         {
        //           borderColor: Selected == 3 ? Colors.PrimaryColor : null,
        //           borderBottomWidth: Selected == 3 ? 2 : null,
        //         },
        //       ]}>
        //       <Text style={styles.ChartHeadTabBarText}>Transit</Text>
        //     </TouchableOpacity>
        //     <TouchableOpacity
        //       onPress={() => setSelected(4)}
        //       style={[
        //         styles.ChartHeadTabBarButton,
        //         {
        //           borderColor: Selected == 4 ? Colors.PrimaryColor : null,
        //           borderBottomWidth: Selected == 4 ? 2 : null,
        //         },
        //       ]}>
        //       <Text style={styles.ChartHeadTabBarText}>Divisional</Text>
        //     </TouchableOpacity>
        //   </View>
        //   {Selected == 1 ? (
        //     <View>
        //       <Text style={styles.heading}>Lagna Chart</Text>
        //       <KunsliChart Datas={Lagna}/>
        //     </View>
        //   ) : null}
        //   {Selected == 2 ? (
        //     <View>
        //       <Text style={styles.heading}>Navamsa</Text>
        //       {/* <SvgXml xml={Navamsa} style={{alignSelf: 'center'}} /> */}
        //       <KunsliChart Datas={Navamsa}/>
        //     </View>
        //   ) : null}
        //   {Selected == 3 ? (
        //     <View>
        //       <Text style={styles.heading}>Transit</Text>
        //       {/* <SvgXml xml={Transit} style={{alignSelf: 'center'}} /> */}
        //       <KunsliChart Datas={Transit}/>
        //     </View>
        //   ) : null}
        //   {Selected == 4 ? (
        //     <View>
        //       <FlatList
        //         data={DivisionalHeaderData}
        //         renderItem={DivisionalHeader}
        //         horizontal={true}
        //       />
        //       {DivisionalSelect == 1 ? (
        //         <View>
        //           <Text style={styles.heading}>Chalit</Text>
        //           <KunsliChart Datas={Transit}/>
        //         </View>
        //       ) : null}
        //       {DivisionalSelect == 2 ? (
        //         <View>
        //           <Text style={styles.heading}>Sun</Text>
        //           <KunsliChart Datas={Sun}/>
        //         </View>
        //       ) : null}
        //       {DivisionalSelect == 3 ? (
        //         <View>
        //           <Text style={styles.heading}>Moon</Text>
        //           <KunsliChart Datas={Moon}/>
        //         </View>
        //       ) : null}
        //       {DivisionalSelect == 4 ? (
        //         <View>
        //           <Text style={styles.heading}>Horo(D-2)</Text>
        //           <KunsliChart Datas={D2}/>
        //         </View>
        //       ) : null}
        //       {DivisionalSelect == 5 ? (
        //         <View>
        //           <Text style={styles.heading}>Drekkana(D-3)</Text>
        //           <KunsliChart Datas={D3}/>
        //         </View>
        //       ) : null}
        //       {DivisionalSelect == 6 ? (
        //         <View>
        //           <Text style={styles.heading}>Chathurthamasha(D-4)</Text>
        //           <KunsliChart Datas={D4}/>
        //         </View>
        //       ) : null}
        //       {DivisionalSelect == 7 ? (
        //         <View>
        //           <Text style={styles.heading}>Saptamansha(D-7)</Text>
        //           <KunsliChart Datas={D7}/>
        //         </View>
        //       ) : null}
        //       {DivisionalSelect == 8 ? (
        //         <View>
        //           <Text style={styles.heading}>Dashamansha(D-7)</Text>
        //           <KunsliChart Datas={D10}/>
        //         </View>
        //       ) : null}
        //       {DivisionalSelect == 9 ? (
        //         <View>
        //           <Text style={styles.heading}>Shodashamsha(D-16)</Text>
        //           <KunsliChart Datas={D16}/>
        //         </View>
        //       ) : null}
        //       {DivisionalSelect == 10 ? (
        //         <View>
        //           <Text style={styles.heading}>Vishamansha(D-20)</Text>
        //           <KunsliChart Datas={D20}/>
        //         </View>
        //       ) : null}
        //       {DivisionalSelect == 11 ? (
        //         <View>
        //           <Text style={styles.heading}>Chaturvimshamsha</Text>
        //           <KunsliChart Datas={D24}/>
        //         </View>
        //       ) : null}
        //       {DivisionalSelect == 12 ? (
        //         <View>
        //           <Text style={styles.heading}>Trishamansha(D-30)</Text>
        //           <KunsliChart Datas={D30}/>
        //         </View>
        //       ) : null}
        //       {DivisionalSelect == 13 ? (
        //         <View>
        //           <Text style={styles.heading}>Khavedamsha(D-40)</Text>
        //           <KunsliChart Datas={D40}/>
        //         </View>
        //       ) : null}
        //       {DivisionalSelect == 14 ? (
        //         <View>
        //           <Text style={styles.heading}>Akshvedansha(D-45)</Text>
        //           <KunsliChart Datas={D45}/>
        //         </View>
        //       ) : null}
        //       {DivisionalSelect == 15 ? (
        //         <View>
        //           <Text style={styles.heading}>Shashtymsha(D-60)</Text>
        //           <KunsliChart Datas={D40}/>
        //         </View>
        //       ) : null}
        //     </View>
        //   ) : null}
        // </View>
         <ScrollView>
            <View style={{ flex: 1, alignItems: 'center', paddingVertical: 20 }}>
          {check !== 9 && <View style={[globalStyles.rowflex, { width: "90%", marginVertical: 15 }]}>
            {types?.map((item) => (
              <TouchableOpacity onPress={() => {setchatrype(item?.value); setDivision(false) }} style={{ padding: 3, borderRadius: 2,  borderColor: theme.colors.primary, borderBottomWidth: chartype == item?.value ? 1.5 : 0, paddingHorizontal: 5 }}><Text style={[globalStyles.text2, { }]}>{item?.name}</Text></TouchableOpacity>
            ))}
                          <TouchableOpacity onPress={() => {setchatrype('sun'); setDivision(true)}} style={{ padding: 3, borderRadius: 2,  borderColor: theme.colors.primary, borderBottomWidth: division ? 1.5 : 0, paddingHorizontal: 5 }}><Text style={[globalStyles.text2, { }]}>Divisional</Text></TouchableOpacity>

          </View>}
          {division&&check !== 9 &&
          <View style={{height:35,marginBottom:20}}>
             <ScrollView horizontal contentContainerStyle={{height:30}} >
            {types2?.map((item) => (
              <TouchableOpacity onPress={() => setchatrype(item?.value)} style={{ padding: 3,marginRight:10, borderRadius: 10, backgroundColor: chartype == item?.value ? theme.colors.primary : 'white', borderColor: 'rgba(0,0,0,.3)', borderWidth: chartype == item?.value ? 0 : 1, paddingHorizontal: 10 }}><Text style={[globalStyles.text2, { color: chartype == item?.value ? "white" : "black" }]}>{lang=='hi'?item?.hindiName:item?.name}</Text></TouchableOpacity>
            ))}
          </ScrollView></View>}
          <SvgXml xml={Transit?.length > 207 && Transit?.substring(203)?.replace(/color:undefined;/g, 'color:black;').replace(/fill:undefined;/g, 'fill:black;')} />
          {check==2&&<View>
          <Text style={[globalStyles.text,{marginTop:20,marginLeft:10},]}>Planets</Text>

<ScrollView horizontal >
{/* <Text style={styles.heading}>Planets</Text> */}
<View style={[styles.TableContainer,]}>
  <View style={styles.TableTop}>
    <Text style={styles.TableHeading1}>Planet</Text>
    <Text style={styles.TableHeading}>Sign</Text>
    <Text style={styles.TableHeading}>Lord</Text>
    <Text style={styles.TableHeading}>Degree</Text>
    <Text style={styles.TableHeading}>House</Text>
  </View>
  <FlatList data={PlanetData?.slice(0, 10)} renderItem={PlanetTable} />
</View>
</ScrollView>
          </View>}
        </View>
         </ScrollView>
      ) : null}

      {check == 4 ? (
        <ScrollView>
          {/* <Text style={styles.heading}>Dasha</Text> */}
          <View style={{marginTop:10,borderColor:'black',}}>
          {dasha?.dashas?.map((item,index)=>(
              <View style={[globalStyles.rowflex,{justifyContent:"center",borderBottomWidth:1,width:"95%",borderLeftWidth:1,marginLeft:15,borderRightWidth:1,borderTopWidth:index==0?1:0}]}>
                <View style={{width:"30%",borderColor:'black',}}>
                 <Text style={[globalStyles.text]}>{item?.dasha}
                 </Text>
                </View>
                <View style={{width:1,backgroundColor:'black',height:'100%',marginHorizontal:5}}></View>
                <View style={{width:"30%",borderColor:'black',paddingVertical:5,paddingHorizontal:5}}>
                 <Text style={[globalStyles.text2]}>{index==0?"Birth":moment(item?.dasha_start_year).format('DD/MM/YYYY')}
                 </Text>
                </View>
                <View style={{width:1,backgroundColor:'black',height:'100%',marginHorizontal:5}}></View>

                <View style={{width:"32%",borderColor:'black',paddingVertical:5,paddingHorizontal:5,}}>
                 <Text style={[globalStyles.text2]}>{moment(item?.dasha_end_year).format('DD/MM/YYYY')}
                 </Text>
                </View>
              </View>
           ))}
          </View>
          <Text style={[globalStyles.text,{marginTop:20,marginLeft:10}]}>Mahadasha</Text>
          <View style={styles.DetailContainer}>
           {dasha?.dashas?.map((item)=>(
            <View style={{padding:10,marginTop:10}}>
              <Text style={[globalStyles.text]}>{item?.dasha}  <Text style={[globalStyles.text2,]}>({moment(item?.dasha_start_year).format('DD/MM/YYYY')} - {moment(item?.dasha_end_year).format('DD/MM/YYYY')})</Text>
              </Text>
               <Text style={[globalStyles.text2,{opacity:.7,fontSize:15}]}>{item?.planet_in_zodiac}</Text>


              {/* {Object.entries(item)?.map((ite)=>(
                              <Text style={[globalStyles.text]}>{ite}</Text>
              ))} */}
            </View>
           ))}
          </View>
        </ScrollView>
      ) : null}

      {check == 5 ? (
        <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
          <Text style={styles.heading}>Numero Table</Text>
          {Object.values(NumeroTable).map((item, index) => (
            <View key={index} style={{ margin: 10, backgroundColor: 'white', padding: 15, borderRadius: 10, elevation: 3 }}>
              <Text style={[globalStyles.text]}>{item.title}</Text>
              {/* <Text style={[globalStyles.text]}>{item.category}</Text> */}
              <Text style={styles.number}>Number: {item.number}</Text>
              <Text style={styles.meaning}>{item.meaning}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          ))}
        </ScrollView>
      ) : null}
      {check == 3 ? (
        <ScrollView horizontal>
          {/* <Text style={styles.heading}>Planets</Text> */}

          <View style={styles.TableContainer}>
            <View style={styles.TableTop}>
              <Text style={styles.TableHeading1}>Planet</Text>
              <Text style={styles.TableHeading}>Sign</Text>
              <Text style={styles.TableHeading}>Lord</Text>
              <Text style={styles.TableHeading}>Degree</Text>
              <Text style={styles.TableHeading}>House</Text>
            </View>
            <FlatList data={PlanetData?.slice(0, 10)} renderItem={PlanetTable} />
          </View>
        </ScrollView>
      ) : null}
      {check == 6 ? (
        <ScrollView>
          <View>
            <Text style={styles.heading}> Ascendant Report </Text>
            {Acsedent?.map((data, index) => (
              <View key={index} style={[globalStyles.container2]}>
                <Text style={[styles.text, styles.heading]}>Ascendant: {data.ascendant}</Text>
                <Text style={[styles.text, styles.additionalText]}>Ascendant Lord: <Text style={[styles.text, styles.subText]}>{data.ascendant_lord}</Text></Text>
                <Text style={[styles.text, styles.additionalText]}>Ascendant Lord Location: {data.ascendant_lord_location}</Text>
                <Text style={[styles.text, styles.additionalText]}>Ascendant Lord House Location: {data.ascendant_lord_house_location}</Text>
                <Text style={[styles.text, styles.additionalText]}>General Prediction: {data.general_prediction}</Text>
                <Text style={[styles.text, styles.additionalText]}>Personalised Prediction: {data.personalised_prediction}</Text>
                <Text style={[styles.text, styles.additionalText]}>Verbal Location: {data.verbal_location}</Text>
                <Text style={[styles.text, styles.additionalText]}>Ascendant Lord Strength: {data.ascendant_lord_strength}</Text>
                <Text style={[styles.text, styles.additionalText]}>Symbol: {data.symbol}</Text>
                <Text style={[styles.text, styles.additionalText]}>Zodiac Characteristics: {data.zodiac_characteristics}</Text>
                <Text style={[styles.text, styles.additionalText]}>Lucky Gem: {data.lucky_gem}</Text>
                <Text style={[styles.text, styles.additionalText]}>Day for Fasting: {data.day_for_fasting}</Text>
                <Text style={[styles.text, styles.additionalText]}>Gayatri Mantra: {data.gayatri_mantra}</Text>
                <Text style={[styles.text, styles.additionalText]}>Flagship Qualities: {data.flagship_qualities}</Text>
                <Text style={[styles.text, styles.additionalText]}>Spirituality Advice: {data.spirituality_advice}</Text>
                <Text style={[styles.text, styles.additionalText]}>Good Qualities: {data.good_qualities}</Text>
                <Text style={[styles.text, styles.additionalText]}>Bad Qualities: {data.bad_qualities}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      ) : null}
    </View>
  );
};

export default KundliDetails;

const styles = StyleSheet.create({
  HeadTabBar: {
    borderColor: Colors.GrayColor,
    borderWidth: 2,
    height: 50,
    alignSelf: 'center',
    marginTop: 5,
    borderRadius: 10,
    flexDirection: 'row',
  },
  HeadTabBarButtonSelected: {
    backgroundColor: theme.colors.primary,
  },
  Indicator: {
    borderRadius: 100,
    // height:90,
    // width:90,
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
    padding: 20,
  },
  HeadTabBarButton: {
    alignSelf: 'center',
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.GrayColor,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    height: '100%',
    paddingVertical: 2,
  },
  HeadTabBarText: {
    textAlign: 'center',
    color: 'black'
  },

  heading: {
    color: 'black',
    fontWeight: 'bold',
    marginLeft: 10,
    fontSize: 15,
    marginTop: 15,
  },
  text: {
    fontSize: 14,
    marginVertical: 5,
  },
  additionalText: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    marginVertical: 5,
    color: 'rgba(0,0,0,.5)',
  },
  DetailBox: {
    flexDirection: 'row',
    paddingVertical: 5,
    paddingVertical: 8,
    // backgroundColor:Colors.GrayColor,
    // marginHorizontal:-5
  },
  ReportText: {
    lineHeight: 20,
    color: 'black',
    fontSize: 12,
    textAlign: 'justify',
  },
  DetailBox2: {
    flexDirection: 'row',
    paddingVertical: 5,
    // backgroundColor:Colors.GrayColor,
    backgroundColor: '#d1d6e0',
    marginHorizontal: -5,
    paddingHorizontal: 5,
    paddingVertical: 8,
  },
  detailKey: {
    width: '50%',
    fontSize: 12,
    color: 'black',
    marginLeft: 5,
  },
  detailAnswer: {
    width: '50%',
    fontSize: 12,
    color: 'black',
  },
  DetailContainer: {
    margin: 8,
    borderColor: Colors.GrayColor,
    borderWidth: 2,
    borderRadius: 10,
    padding: 5,
  },
  TableContainer: {
    margin: 8,
    borderColor: Colors.GrayColor,
    borderWidth: 2,
    // borderRadius: 10,
    padding: 5,
  },
  tableRow: {
    width: 65,
    borderColor: Colors.GrayColor,
    borderLeftWidth: 1,
    textAlign: 'center',
    // marginVertical:5,
    paddingVertical: 10,
    fontSize: 12,
    color: Colors.TextDarkColour
  },
  TableTop: {
    flexDirection: 'row',
    backgroundColor: theme.colors.primary,
    // margin: -5,
    padding: 5,
    // borderTopRightRadius:10,
    // borderTopLeftRadius:10,
  },
  TableHeading: {
    color: 'white',
    fontSize: 15,
    width: 65,
    borderColor: Colors.GrayColor,
    // borderLeftWidth: 1,
    paddingLeft: 5,
    textAlign: 'center',
    // marginVertical:4,
    paddingVertical: 5,
    alignSelf: 'center',
  },
  TableHeading1: {
    color: 'white',
    width: 55,
    paddingLeft: 5,
    textAlign: 'center',
    alignSelf: 'center',
  },

  ChartHeadTabBar: {
    // borderColor: Colors.GrayColor,
    // borderWidth: 2,
    height: 50,
    alignSelf: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    width: '100%',
  },
  ChartHeadTabBarButtonSelected: {
    backgroundColor: Colors.GrayColor,
  },
  ChartHeadTabBarButton: {
    alignSelf: 'center',
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    paddingVertical: 2,
  },
  ChartHeadTabBarText: {
    textAlign: 'center',
  },
  heading: {
    color: 'black',
    fontWeight: 'bold',
    marginLeft: 10,
    fontSize: 15,
    marginTop: 15,
  },
  DivisonalHeadTabBarButtonSelected: {
    backgroundColor: Colors.GrayColor,
  },
  DivisonalHeadTabBarButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.GrayColor,
    paddingVertical: 5,
    borderWidth: 2,
    borderRadius: 20,
    padding: 20,
    margin: 5,
  },
});
