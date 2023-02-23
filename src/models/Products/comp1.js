import { useSelector } from "react-redux";

export default function Comp(props) {
  const storeData = useSelector((state) => state);

  return (
    <>
      {storeData[0][2].find((x) => x.ProductID == props.props.ID) !=
      undefined ? (
        <b>Customers that purchased this product:</b>
      ) : (
        <b>There isn't any Customer that purchased this product!!</b>
      )}
    </>
  );
}
