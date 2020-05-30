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
}
