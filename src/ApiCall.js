import axios from "axios";

export const ApiCall = async (url,data) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization:
        'Bearer ' + 'NjMwMzMyOjdkNWUwYmRkMDA1Njg2MzY2M2E0YmI3ZmNiZDMyZTA1Mzg3NTlhMmU', // token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      day: data.day,
      month: data.month,
      year: data.year,
      hour: data.hour,
      min: parseInt(data.min),
      lat: data.lat,
      lon: data.lon,
      tzone:5.5
    }),
  });

  const Parseddata =await response.json();
  return Parseddata;
};

export const ApiCall2 = async (url,data) => {
 try {
  const res = await axios.get(url,{params:{
    api_key:"c7cd440e-d66f-5f58-ad49-851639299609",
    dob:data?.day+"/"+data?.month.toString().padStart(2, '0')+"/"+data.year,
    lat: data.lat,
    lon: data.lon,
    tob: data?.hour + ":" + data?.min.toString().padStart(2, '0'),
    lang:data?.lang,
    tz:data?.tzone
   }});
   console.log(url,res?.data)
   return res?.data?.response;
 } catch (error) {
  console.log('apical2',error)
 }
};

export const ApiCall3 = async (url,data) => {
  try {
    const res = await axios.get(url,{params:{
      api_key:"c7cd440e-d66f-5f58-ad49-851639299609",
      dob:data?.day+"/"+data?.month.toString().padStart(2, '0')+"/"+data.year,
      lat: data.lat,
      lon: data.lon,
      div:data?.div,
      tob: data?.hour + ":" + data?.min.toString().padStart(2, '0'),
      lang:data?.lang,
      tz:data?.tzone,
      // lang:"hi",
      font_size:12,
      font_style:'roboto',colorful_planets:0,size:300,stroke:2,format:"utf8"
     }});
     console.log(res?.data,url)
     return res?.data;
  } catch (error) {
    console.log(error,'apicall3')
  }
};
