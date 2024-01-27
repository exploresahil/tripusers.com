import { Country } from "@/src/types/country";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { BiSearch } from "react-icons/bi";
const search = (data: Country[], query: string) => {
  const reg = new RegExp(query.toLocaleLowerCase(), "i");
  return data.filter((data) => reg.test(data.countryName.toLocaleLowerCase()));
};

const Popover = ({ data }: { data: Country }) => {
  return <p>{data.countryName}</p>;
};
const Search = ({ data }: { data: Country[] }) => {
  //   console.log(data);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<Country[] | undefined>();
  useEffect(() => {
    if (query !== "") {
      setResult(search(data, query));
    } else {
      setResult([]);
    }
    return () => {};
  }, [query]);
  const inputRef = useRef<HTMLInputElement>(null);
  const PopoverRef = useRef<HTMLInputElement>(null);
  const handleClosePopover = () => {
    gsap.to(PopoverRef.current, {
      opacity: 0,
      top: "-1000%",
      ease: "power1.inOut",
    });
  };
  const handleOpenPopover = () => {
    gsap.to(PopoverRef.current, {
      opacity: 1,
      top: "150%",
      ease: "power1.inOut",
    });
  };
  useGSAP(() => {
    const popoverClose = (e: any) => {
      if (!PopoverRef.current?.contains(e.target)) {
        handleClosePopover();
      }
    };

    inputRef.current?.addEventListener("focus", handleOpenPopover);
    document.addEventListener("mousedown", popoverClose);

    return () => {
      document.removeEventListener("mousedown", popoverClose);
    };
  });

  return (
    <>
      <input
        ref={inputRef}
        data-popover-target="search-box"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search Destinations"
      />
      <BiSearch size={20} />
      {result && result.length !== 0 ? (
        <div ref={PopoverRef} id="search-box" data-popover className="box">
          {result.map((v) => (
            <Popover data={v} />
          ))}
        </div>
      ) : null}
    </>
  );
};

export default Search;
