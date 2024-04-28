import HomeCard from "../components/HomeCard";

let links = [
  { title: "Customers", link: "/customers" },
  { title: "Employees", link: "/employees" },
  { title: "Services", link: "/services" },
  { title: "Travellers", link: "/travellers" },
];

export default function Home() {
  return (
    <main>
      <div className="flex flex-row justify-center py-16">
        <h1 className="text-2xl md:text-3xl font-medium">
          Welcome to car dealership
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full md:w-2/3 mx-auto p-8">
        {links.map((link) => (
          <HomeCard key={link.title} title={link.title} link={link.link} />
        ))}
      </div>
    </main>
  );
}
