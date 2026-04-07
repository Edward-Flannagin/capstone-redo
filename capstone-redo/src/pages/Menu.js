import MyCard from "../Card";
import MenuCard from "../MenuCard";
import NormalMenuItems from "../NormalMenuItems";


function Menu() {
    // ARRAY FOR THE MENU APPETIZERS
    // Appetizers include: Whipped Feta, Hummus and Pita, 
    // Bruschetta al Pomodoro, and Greek Salad.
    const menuItemsAppetizers = [
        // Whipped Feta
        {
            id: 1,
            imgSrc: "/whipped feta.jpg",
            imgAlt: "Whipped Feta",
            title: "Whipped Feta",
            text: "Tangy barrel-aged feta is whipped until light and airy with fresh rosemary and thyme, topped generously with Kalamata olives and a drizzle of robust extra-virgin olive oil, served with warm, hearth-baked pita bread.",
            price: "$14.99",
        },
        // Hummus and pita
        {
            id: 2,
            imgSrc: "/hummus & pita.jpg",
            imgAlt: "Hummas and Pita",
            title: "Hummus and Pita",
            text: "Creamy, house-made hummus blended from organic chickpeas, tahini, lemon juice, and roasted garlic is served smooth and topped with a drizzle of robust olive oil and a sprinkle of paprika, accompanied by warm, fluffy pita bread perfect for dipping.",
            price: "$14.99"
        },
        // Bruschetta al Pomodoro
        {
            id: 3,
            imgSrc: "/bruschetta reg.jpg",
            imgAlt: "Bruschetta al Pomodoro",
            title: "Bruschetta al Pomodoro",
            text: "Toasted slices of rustic Italian bread are rubbed with fresh garlic, topped with sweet, marinated cherry tomatoes, fragrant basil, and a delicate finish of balsamic glaze and extra-virgin olive oil for a perfect, crunchy bite.",
            price: "$5.99",
        },
        // Greek Salad
        {
            id: 4,
            imgSrc: "/greek salad hidef.jpg",
            imgAlt: "Greek Salad",
            title: "Greek Salad",
            text: "The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.",
            price: "$12.99",
        }
        // ...rest of your items
    ]

    // ARRAY FOR THE MENU MAIN COURSES
    // Mains include: Seafood Paella, Chicken Shawarma Rice Bowl, 
    // Moussaka, Gyros, Grilled Fish, Lamb Slouvaki, and Shakshuka.
    const menuItemsMain = [
        // Seafood Paella
        {
            id: 5,
            imgSrc: "/Seafood Paella.jpg",
            imgAlt: "Seafood Paella",
            title: "Seafood Paella",
            text: "Succulent shrimp, tender calamari, mussels, and clams are simmered with bomba rice, vibrant saffron, and smoky chorizo in a rich fish stock until the rice is perfectly al dente and a desired crispy socarrat forms at the bottom of the pan.",
            price: "$14.99",
        },
        // Chicken Shawarma Rice Bowl
        {
            id: 6,
            imgSrc: "/chicken Shawarma Rice Bowl.jpg",
            imgAlt: "Chicken Shawarma Rice Bowl",
            title: "Chicken Shawarma Rice Bowl",
            text: "Succulent, slow-roasted chicken shawarma, marinated overnight in yogurt and warm Middle Eastern spices, is shaved thin and served over fluffy turmeric rice with crisp salad vegetables, tangy pickles, and a drizzle of creamy garlic sauce.",
            price: "$14.99",
        },
        // Moussaka
        {
            id: 7,
            imgSrc: "/Moussaka.jpg",
            imgAlt: "Moussaka",
            title: "Moussaka",
            text: "A decadent layering of rich, spiced ground beef and lamb ragù with tender eggplant and potatoes, all topped with a creamy, golden-baked béchamel sauce that's both comforting and elegant.",
            price: "$12.55",
        },
        // Gyros
        {
            id: 8,
            imgSrc: "/gyros.jpg",
            imgAlt: "Gyros",
            title: "Gyros",
            text: "Savory, herb-infused beef and lamb slices are carved fresh from the spit, enveloped in a warm pita with juicy tomatoes, raw onions, and a generous dollop of cool, garlic-kissed tzatziki sauce for a classic, satisfying bite.",
            price: "$12.55",
        },
        // Grilled Fish
        {
            id: 9,
            imgSrc: "/grilled fish reg.jpg",
            imgAlt: "Grilled Fish",
            title: "Grilled Fish",
            text: "This comes straight from grandma's recipe book! A fresh, flaky whole fish—such as branzino or dorado—is seasoned simply with sea salt, lemon, and fragrant Mediterranean herbs like oregano and thyme, then grilled to perfection and finished with a bright lemon-olive oil sauce.",
            price: "$25.99",
        },
        //Lamb Slouvaki
        {
            id: 10,
            imgSrc: "/lamb Souvlaki.jpg",
            imgAlt: "Lamb Slouvaki",
            title: "Lamb Slouvaki",
            text: "Succulent cubes of boneless leg of lamb, marinated in a fragrant blend of lemon, garlic, and Mediterranean herbs, then grilled over an open flame with bell peppers and onions until juicy and tender. Served with a side of creamy tzatziki sauce and warm pita bread.",
            price: "$18.95",
        },
        // Shakshuka
        {
            id: 11,
            imgSrc: "/Shakshuka.jpg",
            imgAlt: "Shakshuka",
            title: "Shakshuka",
            text: "Spicy, slow-simmered tomatoes, bell peppers, and onions are brightened with cumin and paprika, forming a rich base where fresh eggs are gently poached until the whites are set and the yolks remain perfectly runny, served hot with crusty bread for dipping.",
            price: "$12.55",
        },
    ]

    // ARRAY FOR THE MENU DESSERTS:
    // Desserts include: Tiramisu, Turkish Delight (Lokum), 
    // Rice Pudding (Arroz con Leche), Churros, 
    // Basbousa (Semolina cake), and Baklava.
    const menuItemsDesserts = [
        // Tiramisu
        {
            id: 14,
            imgSrc: "/Tiramisu.jpg",
            imgAlt: "Tiramisu",
            title: "Tiramisu",
            text: "Layers of delicate ladyfingers are quickly dipped in a robust espresso and coffee liqueur blend, then nestled between a rich, velvety mascarpone cream filling and dusted generously with high-quality cocoa powder for an elegant, timeless Italian dessert.",
            price: "$14.99",
        },
        // Turkish Delight (Lokum)
        {
            id: 13,
            imgSrc: "/Turkish Delight.jpg",
            imgAlt: "Turkish Delight (Lokum)",
            title: "Turkish Delight (Lokum)",
            text: "Delicate cubes of rosewater-infused confection are coated lightly in powdered sugar, offering a soft, chewy, and subtly fragrant bite that provides an elegant, traditional sweet finish to any meal.",
            price: "$14.99",
        },
        // Rice Pudding (Arroz con Leche)
        {
            id: 15,
            imgSrc: "/Rice Pudding.jpg",
            imgAlt: "Rice Pudding (Arroz con Leche)",
            title: "Rice Pudding (Arroz con Leche)",
            text: "Creamy Arborio rice is slow-simmered in milk with cinnamon sticks, vanilla, and a hint of citrus zest until perfectly tender, then chilled and dusted with ground cinnamon for a smooth, comforting, and nostalgic dessert.",
            price: "$12.55",
        },
        // Churros
        {
            id: 16,
            imgSrc: "/churros.jpg",
            imgAlt: "Churros",
            title: "Churros",
            text: "Crisp, golden-fried pastry dough is rolled immediately in a generous cinnamon-sugar mixture, served warm and ready for dipping into a rich, decadent chocolate or dulce de leche sauce for a perfect sweet treat.",
            price: "$12.55",
        },
        // Basbousa (Semolina Cake)
        {
            id: 17,
            imgSrc: "/Basbousa.jpg",
            imgAlt: "Basbousa (Semolina Cake)",
            title: "Basbousa (Semolina Cake)",
            text: "A traditional Middle Eastern dessert made with semolina, soaked in sweet syrup, and often flavored with rosewater or orange blossom water.",
            price: "$12.55",
        },
        // Baklava
        {
            id: 12,
            imgSrc: "/Baklava.jpg",
            imgAlt: "Baklava",
            title: "Backlava",
            text: "Layers of delicate, flaky phyllo pastry are brushed with melted butter, layered with a rich mixture of finely chopped walnuts and pistachios, baked until golden and crisp, then drenched in a sweet, spiced orange blossom syrup for a truly decadent and satisfying crunch.",
            price: "$18.95",
        },
    ]

    return (
        <>
            {/* SPECIALS SECTION */}
            <article className="menu-content">
                <div className="menu-header">
                    <div className="menu-h1">
                        <h1>Menu</h1>
                    </div>
                </div>
            </article>

            <article className="menu-specials-section">
                <h2 className="menu-specials-header-h2-light">This week's specials:</h2>
                <article className='specials-cards'>
                    <div className='special-card'>
                        <MyCard id={4}
                            imgSrc="/greek salad hidef.jpg"
                            imgAlt="Greek Salad"
                            title="Greek Salad"
                            text="The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons."
                            price="$12.99" />
                    </div>
                    <div className="special-card">
                        <MyCard id={3}
                            imgSrc="/bruschetta hidef.jpg"
                            imgAlt="Bruschetta"
                            title="Bruschetta al Pomodoro"
                            text="Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil."
                            price="$5.99" />
                    </div>
                    <div className="special-card">
                        <MyCard id={9}
                            imgSrc="/grilled fish hidef.jpg"
                            imgAlt="Grilled Fish"
                            title="Grilled Fish"
                            text="This comes straight from grandma's recipe book, every last ingredient has been sourced and is as authentic as can be imagined."
                            price="$25.99" />
                    </div>
                </article>
            </article>

            {/* OTHER MENU ITEMS */}
            <article className="menu-items">
                <h2 className="menu-specials-header-h2">Our family's personal favorites:</h2>
                <div className="menu-cards">
                    <div className="menu-card">
                        <MenuCard id={17}
                            imgSrc="/pasta.jpg"
                            imgAlt="pasta"
                            title="Pasta"
                            text="This recipe comes straight from our home in the Mediterranean. It's sauce is a traditional tomato sauce with garlic, oregano, and thyme. With our own home-grown herbs and spices!"
                            price="$20.95"
                        />
                    </div>
                    <div className="menu-card">
                        <MenuCard id={18}
                            imgSrc="/bagel sandwich.jpg"
                            imgAlt="bagel sandwich"
                            title="Bagel Sandwich"
                            text="It's simplicity is its virtue, with its crunchy bagel, fresh tomato, fresh spinach, and delishous cream cheese, this is quite possibly the best breakfast food."
                            price="$5.99"
                        />
                    </div>
                    <div className="menu-card">
                        <MenuCard id={10}
                            imgSrc="/lamb Souvlaki.jpg"
                            imgAlt="Grilled Lamb Kabobs"
                            title="Lamb Kabobs"
                            text="Succulent, lemon-garlic marinated boneless lamb leg cubes are grilled over an open flame with bell peppers and onions until juicy and tender, served with creamy tzatziki sauce and warm pita bread."
                            price="$18.95"
                        />
                    </div>
                    <div className="menu-card">
                        <MenuCard id={8}
                            imgSrc="/gyros.jpg"
                            imgAlt="Gyros"
                            title="Gyros"
                            text="Savory, herb-infused beef and lamb slices are carved fresh
                                  from the spit, enveloped in a warm pita with juicy tomatoes,
                                  raw onions, and a generous dollop of cool, garlic-kissed 
                                  tzatziki sauce for a classic, satisfying bite."
                            price="$12.55"
                        />
                    </div>
                    <div className="menu-card">
                        <MenuCard id={11}
                            imgSrc="/Shakshuka.jpg"
                            imgAlt="Shakshuka"
                            title="Shakshuka"
                            text="Spicy, slow-simmered tomatoes, bell peppers, and onions 
                                  are brightened with cumin and paprika, forming a rich 
                                  base where fresh eggs are gently poached until the whites
                                  are set and the yolks remain perfectly runny, served hot 
                                  with crusty bread for dipping."
                            price="$12.55"
                        />
                    </div>
                    <div className="menu-card">
                        <MenuCard id={7}
                            imgSrc="/Moussaka.jpg"
                            imgAlt="Moussaka"
                            title="Moussaka"
                            text="A decadent layering of rich, spiced ground beef and lamb
                                  ragù with tender eggplant and potatoes, all topped with
                                  a creamy, golden-baked béchamel sauce that's both 
                                  comforting and elegant."
                            price="$12.55"
                        />
                    </div>
                </div>
            </article>

            {/* NORMAL MENU ITEMS: APPETIZERS */}
            <article className="normal-menu-items">
                <h2 className="menu-specials-header-h2">Appetizers: </h2>
                <div className="norm-menu-list">
                    {menuItemsAppetizers.map((item, i) => (
                        <NormalMenuItems
                            key={i}
                            {...item}
                        // reverse={i % 2 === 1}   // alternate every other card
                        />
                    ))}
                </div>
            </article>

            {/* NORMAL MENU ITEMS: MAIN COURSES */}
            <article className="normal-menu-items">
                <h2 className="menu-specials-header-h2">Main courses: </h2>
                <div className="norm-menu-list">
                    {menuItemsMain.map((item, i) => (
                        <NormalMenuItems
                            key={i}
                            {...item}
                        // reverse={i % 2 === 1}   // alternate every other card
                        />
                    ))}
                </div>
            </article>

            {/* NORMAL MENU ITEMS: DESSERTS */}
            <article className="normal-menu-items">
                <article className="last-list">
                    <h2 className="menu-specials-header-h2">Desserts: </h2>
                    <div className="norm-menu-list">
                        {menuItemsDesserts.map((item, i) => (
                            <NormalMenuItems
                                key={i}
                                {...item}
                            // reverse={i % 2 === 1}   // alternate every other card
                            />
                        ))}
                    </div>
                </article>
            </article>
        </>
    );
}
export default Menu;