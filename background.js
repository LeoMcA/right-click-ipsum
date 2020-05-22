// from https://la.wikisource.org/wiki/De_finibus_bonorum_et_malorum/Liber_Primus
const source = `
Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo.nemo enim ipsam voluptatem, quia voluptas sit, aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos, qui ratione voluptatem sequi nesciunt, neque porro quisquam est, qui dolorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat voluptatem.ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur ?
At vero eos et accusamus et iusto odio dignissimos ducimus, qui blanditiis praesentium voluptatum deleniti atque corrupti, quos dolores et quas molestias excepturi sint, obcaecati cupiditate non provident, similique sunt in culpa, qui officia deserunt mollitia animi, id est laborum et dolorum fuga.et harum quidem rerum facilis est et expedita distinctio.nam libero tempore, cum soluta nobis est eligendi optio, cumque nihil impedit, quo minus id, quod maxime placeat, facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet, ut et voluptates repudiandae sint et molestiae non recusandae.itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.
Hanc ego cum teneam sententiam, quid est cur verear, ne ad eam non possim accommodare Torquatos nostros ? quos tu paulo ante cum memoriter, tum etiam erga nos amice et benivole collegisti, nec me tamen laudandis maioribus meis corrupisti nec segniorem ad respondendum reddidisti.quorum facta quem ad modum, quaeso, interpretaris ? sicine eos censes aut in armatum hostem impetum fecisse aut in liberos atque in sanguinem suum tam crudelis fuisse, nihil ut de utilitatibus, nihil ut de commodis suis cogitarent ? at id ne ferae quidem faciunt, ut ita ruant itaque turbent, ut earum motus et impetus quo pertineant non intellegamus, tu tam egregios viros censes tantas res gessisse sine causa ?
`
  .split("\n")
  .map((x) => x.split(" "))
  .flat();

function next_word() {
  return source[Math.floor(Math.random() * source.length)];
}

browser.menus.create({
  id: "ipsum",
  title: "Insert Lorem Ipsum...",
  contexts: ["editable"],
});

browser.menus.onClicked.addListener((info, tab) => {
  if (info.menuItemId == "ipsum") {
    let target_element = `browser.menus.getTargetElement(${info.targetElementId})`;

    let ipsum_short = "";
    while (ipsum_short.length < 20) {
      ipsum_short += next_word() + " ";
    }
    let ipsum_long = ipsum_short;
    while (ipsum_long.length < 200) {
      ipsum_long += next_word() + " ";
    }

    browser.tabs.executeScript(tab.id, {
      frameId: info.frameId,
      code: `
        if (${target_element}.tagName === "TEXTAREA") {
          ${target_element}.value += "${ipsum_long}"
        } else {
          ${target_element}.value += "${ipsum_short}"
        }
      `,
    });
  }
});
