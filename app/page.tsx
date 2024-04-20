import HomeCard from "../components/HomeCard";

let links = [
  { title: "Cars", link: "/cars" },
  { title: "Employees", link: "/employees" },
  { title: "Services", link: "/services" },
  { title: "Travellers", link: "/travellers" },
];

export default function Home() {
  return (
    <main>
      <div className="flex flex-row justify-center py-16">
        <h1 className="text-3xl font-medium">
          Welcome to ultra car dealership
        </h1>
      </div>
      <div className="grid grid-cols-2 gap-6 w-2/3 bg-blue-200 mx-auto p-8">
        {links.map((link) => (
          <HomeCard key={link.title} title={link.title} link={link.link} />
        ))}
      </div>
    </main>
  );
}
