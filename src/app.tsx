// import $ from "jquery";
import Content from "./content.html?raw";

function trigger(el: Element, eventType: string) {
	if (typeof eventType === "string" && typeof el[eventType] === "function") {
		el[eventType]();
	} else {
		const event = typeof eventType === "string" ? new Event(eventType, { bubbles: true }) : eventType;
		el.dispatchEvent(event);
	}
}

// const Delimiter = "----------------------------------------------------\r\n",
const Delimiter = /\-{10,}\r?\n/,
	KeyCode_Left = 37,
	KeyCode_Up = 38,
	KeyCode_Right = 39,
	KeyCode_Down = 40;

let Name = "RegEx Basics by Shahab Movahhedi",
	IsLightMode = false,
	Pages = Content.split(Delimiter),
	Page = 0,
	AllPages = Pages.length - 1;

const LoadPage = (page = 0) => {
	document.getElementById("MainContent").innerHTML = (Pages[page] as string).replace(
		"DTNOW",
		new Date().toISOString().slice(0, 19).replace("T", " ")
	);
	// setTimeout(() => $("textarea").trigger("input"), 100);
	setTimeout(() => {
		[...document.getElementsByTagName("textarea")].map((i) => trigger(i, "input"));
	}, 100);
};

document.addEventListener("keydown", (event) => {
	if (!event.ctrlKey) return;

	if (event.keyCode === KeyCode_Left) {
		if (Page <= 0) {
			Page = AllPages;
		} else Page--;
		LoadPage(Page);
	} else if (event.keyCode === KeyCode_Right) {
		if (Page >= AllPages) {
			Page = 0;
		} else Page++;
		LoadPage(Page);
	} else if (event.keyCode === KeyCode_Up) {
		IsLightMode = !IsLightMode;
		if (IsLightMode) document.body.classList.add("LightMode");
		else document.body.classList.remove("LightMode");
	}
});

const PageContent = (
	<div>
		<div id="LineNumbers">
			{[...Array(14 + 1).keys()].slice(1).map((i) => (
				<p class="Line">{i}</p>
			))}
		</div>
		<div id="Content">
			<textarea
				id="Input"
				spellCheck={false}
				placeholder=" "
				rows={1}
				onInput={(e) => {
					e.currentTarget.style.height = "25px";
					e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
					e.currentTarget.removeAttribute("rows");
				}}
				onKeyDown={(e) => {
					e.currentTarget.spellcheck = false;
					if (e.key == "Tab") {
						// get caret position/selection
						const target = e.currentTarget as HTMLTextAreaElement;
						const start = target.selectionStart ?? 0;
						const end = target.selectionEnd ?? 0;

						const value = "" + e.currentTarget.value;

						// set textarea value to: text before caret + tab + text after caret
						e.currentTarget.value = value.substring(0, start) + "\t" + value.substring(end);

						// put caret at right position again (add one for the tab)
						target.selectionStart = target.selectionEnd = start + 1;

						// prevent the focus lose
						e.preventDefault();
					}
				}}
			></textarea>
			<div id="MainContent"></div>
		</div>
		<span id="Copyright" class="comment">
			// {Name}
		</span>
	</div>
);

// $(() => {
document.body.append(PageContent);
document.title = Name;
LoadPage(0);
