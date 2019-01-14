import React from "react";
import _ from "lodash";
import MockFactory from "../../../../common/mockFactory";
import { ReactWrapper, mount, shallow, ShallowWrapper } from "enzyme";
import Canvas, { ICanvasProps } from "./canvas";
import { EditorMode } from "../../../../models/applicationState";
import { RegionData, RegionDataType } from "vott-ct/lib/js/CanvasTools/Core/RegionData";
import { Point2D } from "vott-ct/lib/js/CanvasTools/Core/Point2D";
jest.mock("vott-ct");
import { CanvasTools } from "vott-ct";
import { SelectionMode } from "vott-ct/lib/js/CanvasTools/Selection/AreaSelector";
jest.mock("vott-ct/lib/js/CanvasTools/Region/RegionsManager");
import { RegionsManager } from "vott-ct/lib/js/CanvasTools/Region/RegionsManager";
// const Editor = jest.genMockFromModule("vott-ct/lib/js/CanvasTools/CanvasTools.Editor");
// Editor.RM = new RegionsManager(null,null,null);
// import { Editor } from "vott-ct/lib/js/CanvasTools/CanvasTools.Editor";

jest.mock("vott-ct/lib/js/CanvasTools/CanvasTools.Editor", () => () =>  ({
    scaleRegionToFrameSize: jest.fn(),//() => 0,
    scaleRegionToSourceSize: jest.fn(),//() => 0,
    setSelectionMode: jest.fn(),//() => SelectionMode.RECT,
    RM: new RegionsManager(null,null,null),
    onSelectionEnd: jest.fn(),
    onRegionMove: jest.fn(),
    onRegionDelete: jest.fn(),
    onRegionSelected: jest.fn(),
    addContentSource: jest.fn()
}))

describe("Editor Canvas", () => {
    let wrapper: ShallowWrapper = null;

    function createComponent(props: ICanvasProps) {
        try{return shallow(<Canvas {...props} />);}
        catch(e){console.log(e)}
    }

    function createProps(): ICanvasProps {
        return {
            selectedAsset: MockFactory.createTestAssetMetadata(MockFactory.createTestAsset("test")),
            onAssetMetadataChanged: jest.fn(),
            editorMode: EditorMode.Rectangle,
        };
    }

    beforeAll(() => {
        // CanvasTools.Editor.prototype = new Editor(null);
    })

    beforeEach(() => {
        const props = createProps();
        wrapper = createComponent(props);
    });

    it("onSelectionEnd adds region to asset", () => {
        const testCommit = new RegionData( 0, 0, 0, 0, [new Point2D( 0, 0), new Point2D( 1, 0), new Point2D( 0, 1), new Point2D( 1, 1)], RegionDataType.Rect)
        const canv = wrapper.find(Canvas).childAt(0).instance() as Canvas
        canv.onSelectionEnd(testCommit);
        return true;
        // expect(wrapper.instance().props)
    });
    it("onRegionMove edits region info in asset", () => {
        return true;
    });
    it("onRegionDelete removes region from asset", () => {
        return true;
    });
    it("onRegionSelected adds region to list of selected regions on asset", () => {
        return true;
    });
});
