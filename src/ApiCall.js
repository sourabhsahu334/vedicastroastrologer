export const ApiCall = async (url, data) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization:
        'Bearer ' + 'NjIzMjQ4OjVmZDYyZDY2NGQ2MDdjNTE4ZDc2ZmEzYWRhOTE0MTg2', // token,
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
      tzone: 5.5,
    }),
  });

  const Parseddata = await response.json();
  return Parseddata;
};
