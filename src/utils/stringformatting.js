export const formatVarString = (template, args) => {
    let s = template;
    for (var i = 0; i < args.length; i++) {
        let reg = new RegExp("\\{" + i + "\\}", "gm");
        s = s.replace(reg, args[i]);
    }
    return s;
}

