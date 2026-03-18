export function formatDate(date){
    if(!date) return "";

    const parsedDate = new Date(date);
    return parsedDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
    })
}