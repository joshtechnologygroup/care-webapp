const defaultMapping = [
    {
    id: 1,
    name: 'Male',
    },
    {
    id: 2,
    name: 'Female',
    },
    {
    id: 3,
    name: 'Others',
    },
    {
        id: 1,
        name: 'Yes',
    },
    {
        id: 2,
        name: 'No',
    },
    {
        id: 'home-isolation',
        name: 'Home Isolation',
    },
    {
        id: 'recovered',
        name: 'Recovered',
    },
    {
        id: 'dead',
        name: 'Dead',
    },
    {
        id: 'facility-status',
        name: 'Facility Status',
    },
]

export const mappingProps = (params, list=defaultMapping) => {
    const update_params = Object.assign({}, params);
    let universal_mapping = {}
    list.forEach((key) => {
        universal_mapping[key.name] = key.id
    })
    Object.keys(update_params).forEach((paramKey) => {
        update_params[paramKey] = new Array(...update_params[paramKey])
        update_params[paramKey].forEach((arg, index) => update_params[paramKey][index] = universal_mapping[arg])
    })
    return update_params;
};

export const mappingIdWithNames = (list, db_list, attr) => {
    list.forEach((row) => {
        const found_id = db_list.find((value, index, array) => {
            return (value.id === row[attr]);
        })
      if(found_id) {
        row[attr] = found_id.name;
      }
    });
    return list;
};
