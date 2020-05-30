import * as Constants from 'Constants/app.const';

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
  requiredLists,
  val
) => {
    const updateSelectedParams = {
        ...selectedParams,
        ...mapProps(val, requiredLists),
    };
    console.log(val, {...updateSelectedParams})
    return updateSelectedParams
};

export const multiSelectNumberFilterCallback = (
    selectedParams,
    val
) => {
    let update_select_params = { ...selectedParams };
    Object.keys(update_select_params).forEach(key => {
        if (key.includes(val.field)) delete update_select_params[key];
    });
    if (val.fromValue !== "" || val.toValue !== "") {
        if (val.type === Constants.EQUAL_TO) {
            update_select_params[val.field] = val.fromValue;
        } else if (val.type === Constants.LESS_THAN) {
            update_select_params[val.field + "__lt"] = val.fromValue;
        } else if (val.type === Constants.GREATER_THAN) {
            update_select_params[val.field + "__gt"] = val.fromValue;
        } else if (val.type === Constants.RANGE) {
            update_select_params[
                val.field + "__range"
            ] = `${val.fromValue},${val.toValue}`;
        }
    }
    return update_select_params;
};
