import React, { useEffect, useMemo, useState } from "react";
import { Button } from "react-bootstrap";
import { useWeb3React } from "@web3-react/core";

import { useContract } from "../../hooks";
import Color from "../../contracts/Color.json";

const DummyNFT = () => {
  const [mintedColors, setMintedColors] = useState([]);
  const [color, setColor] = useState("");
  const [totalSupply, setTotalSupply] = useState(0);

  const { account } = useWeb3React();
  const colorContract = useContract(
    "0x42F94aEBBD548AF5F62304AeA2d895F300511dB6",
    Color.abi,
    false
  );

  const onMintClick = () => {
    colorContract.methods
      .mint(color)
      .send({
        from: account,
      })
      .on("transactionHash", (receipt) => {
        console.log({ receipt });
      });
    setColor("");
  };

  useEffect(() => {
    const loadColors = async () => {
      const totalSupply = await colorContract.methods
        .totalSupply()
        .call({ from: account });
      console.log({ totalSupply });
      setTotalSupply(totalSupply);
      // Load Colors
      for (var i = 1; i <= totalSupply; i++) {
        const color = await colorContract.methods.colors(i - 1).call();
        console.log({ color });
        setMintedColors([...mintedColors, color]);
      }
    };

    loadColors();
  }, [totalSupply]);

  // const mintedColor = useMemo(async () => {
  //   const colors = [];
  //   // Load Colors
  //   for (var i = 1; i <= totalSupply; i++) {
  //     const color = await colorContract.methods.colors(i - 1).call();
  //     console.log({ color });
  //     // setMintedColors([...mintedColors, color]);
  //   }

  //   return colors;
  // }, [totalSupply]);

  console.log({ mintedColors });
  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <main role="main" className="col-lg-12 d-flex text-center">
          <div className="content mr-auto ml-auto">
            <h1>Issue Token</h1>
            <input
              type="text"
              value={color}
              className="form-control mb-1"
              placeholder="e.g. #FFFFFF"
              onChange={(event) => setColor(event.target.value)}
            />
            <Button
              variant="outline-primary"
              disabled={!color}
              onClick={onMintClick}
            >
              MINT
            </Button>
          </div>
        </main>
      </div>
      <hr />
      <div className="row text-center">
        {mintedColors
          ? mintedColors.map((color, key) => {
              return (
                <div key={key} className="col-md-3 mb-3">
                  <div
                    className="token"
                    style={{ backgroundColor: color }}
                  ></div>
                  <div>{color}</div>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default DummyNFT;
