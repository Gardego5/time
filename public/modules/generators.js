import { dayInnerElements, getDayNum } from "./utils.js";

export function generateDayDiv(day) {
    let tag = Object.assign(document.createElement('div'), {
        className: 'day',
        date: day.date,
        day: day,
        selectedToEdit: false,
        onclick: function(event) {
            if (!this.selectedToEdit) {
                this.toggleEdit();
            }
        },
        toggleEdit: function() {
            if (this.selectedToEdit) {
                /** Weird thing, you must run in setTimeout, otherwise
                 *  you end up retriggering the dayDiv's onclick method
                 *  immediately, making it retoggle and not work as
                 *  expected.
                 */
                setTimeout(() => {
                    this.selectedToEdit = false;
                })
                for (let subTag of this.children) {
                    subTag.style.display = "";
                }
            } else {
                this.selectedToEdit = true;
                for (let subTag of this.children) {
                    switch(subTag.className) {
                        case "data":
                        case "endEdit":
                            subTag.style.display = "block";
                            break;
                        case "display":
                            subTag.style.display = "none";
                            break;
                    }
                }
            }
        }
    });

    /** List of elements to add to tag. */
    dayInnerElements(day).forEach(subTag => {
        tag.appendChild(subTag);
    })

    return tag;
}
