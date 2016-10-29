const mapDefault = {
  markers: [{
    position: {
      lat: 13.7310109,
      lng: 100.7810176,
    },
    key: `KMITL`,
    defaultAnimation: 2,
  }]
}

const map = (state = mapDefault, action) => {
  switch(action.type) {
    case 'SET_MAP':
      console.log(action.lat,':' ,action.lng)
      return {
        markers: [
          {
            position: {
              lat: action.lat,
              lng: action.lng
            },
            defaultAnimation: 2,
            key: Date.now(),
          }
        ]
      }
    default:
      return state
  }
}

export default map