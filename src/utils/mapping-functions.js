export const defaultMapping = [
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
    }
]

export const mappingProps = (params, ...list) => {
    const update_params = Object.assign({}, params);
    list.push(defaultMapping);
    Object.keys(update_params).forEach((paramKey) => {
        update_params[paramKey].forEach((param, index) => {
            update_params[paramKey] = new Array(update_params[paramKey])
            list.forEach((redux_list)=>{
                redux_list.forEach((row)=>{
                    if(row.name === param){
                        update_params[paramKey][index] =  row.id
                    }
                })
            })
        })
    })
    return update_params;
}
