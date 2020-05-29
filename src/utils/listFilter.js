const getDictNameToId = list => {
    const listMap = {};
    list.forEach(item => {
        listMap[item.name] = item.id;
    });
    return listMap;
};

const mapNameToId = (nameToIdDict, nameList) => {
    return nameList.map(name => nameToIdDict[name]);
};

export const mapProps = (params, requiredLists) => {
    const updateParams = Object.assign({}, params);
    Object.keys(requiredLists).forEach(function(listKey) {
        Object.keys(updateParams).forEach(function(paramKey) {
            if (paramKey === listKey) {
                updateParams[paramKey] = mapNameToId(
                    getDictNameToId(requiredLists[listKey]),
                    updateParams[paramKey]
                );
            }
        });
    });
    return updateParams;
};

export const multiSelectBooleanFilterCallback = (
    selectedParams,
    setSelectedParams,
    requiredLists,
    val
) => {
    let updateSelectedParams = {
        ...selectedParams,
        ...val,
    };

    setSelectedParams({ ...mapProps(updateSelectedParams, requiredLists) });
};

export const multiSelectNumberFilterCallback = (
    selectedParams,
    setSelectedParams,
    val
) => {
    let update_select_params = { ...selectedParams };
    Object.keys(update_select_params).forEach(key => {
        if (key.includes(val.field)) delete update_select_params[key];
    });
    if (val.fromValue !== "" && val.toValue !== "") {
        if (val.type === "Equals To") {
            update_select_params[val.field] = val.fromValue;
        } else if (val.type === "Less Than") {
            update_select_params[val.field + "__lt"] = val.fromValue;
        } else if (val.type === "Greater Than") {
            update_select_params[val.field + "__gt"] = val.fromValue;
        } else if (val.type === "Range") {
            update_select_params[
                val.field + "__range"
            ] = `${val.fromValue},${val.toValue}`;
        }
    }
    setSelectedParams({ ...update_select_params });
};
